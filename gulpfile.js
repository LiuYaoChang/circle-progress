const gulp = require('gulp');
const debug = require('gulp-debug');
const ts = require('gulp-typescript');
const cached = require('gulp-cached');
const tap = require('gulp-tap');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const path = require('path');
const del = require('del');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const uglifyjs = require('uglify-js');
const composer = require('gulp-uglify/composer');
const pump = require('pump');
const minimist = require('minimist');
const fs = require('fs');
const util = require('util');
const minify = composer(uglifyjs, console);
const hasRmCssFiles = new Set();
const eslint = require('gulp-eslint');
const exec = require('child_process').exec;
const gulpI18nWxml = require('@miniprogram-i18n/gulp-i18n-wxml');
const gulpI18nLocales = require('@miniprogram-i18n/gulp-i18n-locales');
const alias = require('gulp-ts-alias');
const weappAlias = require('gulp-wechat-weapp-src-alisa');
const task = require('./config/task/index');

const tsconfig = path.resolve(__dirname, './tsconfig.json');
const sourceRoot = path.resolve(__dirname, './src');
const dist = path.resolve(__dirname, './miniprogram');
const cssFilterFiles = require('./config/cssFilterFiles.js');

const weappAliasConfig = {
  '@': path.join(__dirname, './src'),
};

const paths = {
  less: './src/**/*.{less, wxss}',
  script: ['./src/**/*.ts', './typings/index.d.ts'],
  language: ['./src/i18n/**/*.json', './src/pages/**/*.wxml'],
  pageWxml: './src/pages/**/*.wxml',
  static: [
    'src/**/*.json',
    './src/**/*.wxml',
    './src/**/*.wxss',
    'src/**/*.wxs',
    'src/**/*.png',
    'src/**/*.svg',
    './src/**/*.js',
  ],
  clean: [
    'miniprogram/**',
    '!miniprogram',
    '!miniprogram/node_modules',
    '!miniprogram/miniprogram_npm',
  ],
};

gulp.task('compile:ts', cb => {
  const tsProject = ts.createProject(tsconfig);
  const tsResult = gulp
    .src(paths.script)
    .pipe(cached('script'))
    .pipe(alias({ configuration: tsProject.config }))
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .on('error', () => { });

  pump([tsResult.js, sourcemaps.write({ sourceRoot }), gulp.dest(dist)], cb);
});

gulp.task('build:ts', cb => {
  const tsProject = ts.createProject(tsconfig);
  const tsResult = gulp
    .src(paths.script)
    .pipe(alias({ configuration: tsProject.config }))
    .pipe(tsProject())
    .on('error', () => { });

  const options = {
    compress: {
      drop_console: false,
      drop_debugger: true,
    },
  };

  pump([tsResult.js, minify(options), gulp.dest(dist)], cb);
});

gulp.task('compile:less', cb => {
  pump(
    [
      gulp.src(paths.less).pipe(cached('less')),
      weappAlias(weappAliasConfig),
      tap(file => {
        const content = file.contents.toString();
        const regNotes = /\/\*(\s|.)*?\*\//g;
        const reg = /@import\s+['|"](.+)['|"];/g;
        const removeComment = content.replace(regNotes, ''); /* removeComment */
        const str = removeComment.replace(reg, ($1, $2) => {
          const hasFilter = cssFilterFiles.filter(
            item => $2.indexOf(item) > -1,
          );
          let path = hasFilter <= 0 ? `/** less: ${$1} **/` : $1;
          return path;
        });
        file.contents = Buffer.from(str, 'utf8');
      }),
      less(),
      tap(file => {
        const filePath = path.dirname(file.path);
        const content = file.contents.toString();
        const regNotes = /\/\*\* less: @import\s+['|"](.+)['|"]; \*\*\//g;
        const reg = /@import\s+['|"](.+)['|"];/g;
        const str = content.replace(regNotes, ($1, $2) => {
          let less = '';
          $1.replace(reg, $3 => (less = $3));
          return less.replace(/\.less/g, '.wxss');
        });
        file.contents = Buffer.from(str, 'utf8');
      }),
      rename({ extname: '.wxss' }),
      gulp.dest(dist),
    ],
    cb,
  );
});

// 清空 dist
gulp.task('clear:dist', () => {
  return del(paths.clean);
});

gulp.task('less:watch', function () {
  gulp.watch(paths.less, gulp.parallel('compile:less'));
});

gulp.task('copy:static', () => {
  return gulp
    .src(paths.static)
    .pipe(cached('static'))
    .pipe(gulp.dest(dist));
});

gulp.task('watch:script', () => {
  const watcher = gulp.watch(paths.script);
  const onChangeAndAdd = gulp.parallel('compile:ts');

  watcher.on('change', onChangeAndAdd);
  watcher.on('add', onChangeAndAdd);
  watcher.on('unlink', path => {
    const _targetPath = path.replace('src', dist).replace(/.ts$/, '.js');
    del(_targetPath).then(() => {
      console.log(`File ${_targetPath} was removed`);
    });
  });

  // gulp.watch(paths.script, gulp.parallel('compile:ts'));
});

gulp.task('watch:static', () => {
  const watcher = gulp.watch(paths.static);
  const onChangeAndAdd = gulp.series(
    'copy:static',
    'mergeAndGenerateLocales',
    'transpileWxml',
  );

  watcher.on('change', onChangeAndAdd);
  watcher.on('add', onChangeAndAdd);
  watcher.on('unlink', path => {
    const _targetPath = path.replace('src', dist);
    del(_targetPath).then(() => {
      console.log(`File ${_targetPath} was removed`);
    });
  });

  // gulp.watch(paths.static, gulp.series('copy:static'));
});

gulp.task('watch:less', () => {
  const watcher = gulp.watch(paths.less);
  const onChangeAndAdd = gulp.parallel('compile:less');

  watcher.on('change', onChangeAndAdd);
  watcher.on('add', onChangeAndAdd);
  watcher.on('unlink', path => {
    const _targetPath = path.replace('src', dist).replace(/.less$/, '.wxss');
    del(_targetPath).then(() => {
      console.log(`File ${_targetPath} was removed`);
    });
  });

  // gulp.watch(paths.less, gulp.parallel('compile:less'));
});

// gulp.task('watch:language', () => {
//   const watcher = gulp.watch(paths.language);
//   const onChangeAndAdd = gulp.series(
//     'mergeAndGenerateLocales',
//     'transpileWxml',
//   );
//   watcher.on('change', onChangeAndAdd);
//   watcher.on('add', onChangeAndAdd);
//   // gulp.watch(paths.less, gulp.parallel('compile:less'));
// });

gulp.task('module:install', cb => {
  // copy package.json
  const destPath = './miniprogram/package.json';
  const sourcePath = './package.json';
  if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist);
  }

  const sourcePkg = require(path.resolve(sourcePath));

  try {
    if (fs.existsSync(path.resolve(destPath))) {
      // 判断是否有 package.json 的变动
      const destPkg = require(path.resolve(destPath));
      if (
        destPkg &&
        JSON.stringify(sourcePkg.dependencies) ===
        JSON.stringify(destPkg.dependencies)
      ) {
        cb();
        return;
      }
    }
    fs.copyFileSync(path.resolve(sourcePath), path.resolve(destPath));
    exec(
      'cd miniprogram && npm install --no-package-lock --production',
      (err, stdout, stderr) => {
        if (err) {
          console.log('npm install failed: ', err);
          process.exit(1);
        }
        cb();
      },
    );
  } catch (error) {
    console.log(error);
  }
});
/**
 * 国际化，复制国际化文件到dist
 */
gulp.task('mergeAndGenerateLocales', () => {
  return gulp
    .src(sourceRoot + '/**/i18n/*.json')
    .pipe(gulpI18nLocales({ defaultLocale: 'CN', fallbackLocale: 'CN' }))
    .pipe(gulp.dest(dist + '/i18n/'));
});

/**
 * 国际化，遍历所有wxml，进行转换复制到dist
 */
gulp.task('transpileWxml', () => {
  return (
    gulp
      .src('src/**/*.wxml')
      .pipe(gulpI18nWxml())
      .pipe(gulp.dest(dist))
  );
});

// build
gulp.task(
  'build',
  gulp.series(
    gulp.series('clear:dist', 'module:install'),
    gulp.series(
      gulp.parallel('build:ts', 'compile:less'),
      'copy:static',
      'mergeAndGenerateLocales',
      'transpileWxml',
      task.configTask,
    ),
  ),
);

// watch
gulp.task(
  'watch',
  gulp.series(
    'clear:dist',
    'module:install',
    gulp.series(
      gulp.parallel('compile:ts', 'compile:less'),
      'mergeAndGenerateLocales',
      'transpileWxml',
      'copy:static',
      task.configTask,
    ),
    gulp.parallel(
      'watch:script',
      'watch:less',
      // 'watch:language',
      gulp.series('mergeAndGenerateLocales', 'transpileWxml', 'watch:static'),
    ),
  ),
);
