//index.js
//获取应用实例
const app = getApp()

Page({
  page: {
    page: 1,
    pageSize: 10
  },
  data: {
    loading: 0,
    list: []
  },
  onLoad: function () {
    this.init();
  },
  onReachBottom() {
    this.loadMore();
  },
  init() {
    this.page = {
      page: 1,
      pageSize: 10
    };

    this.setData({
      list: []
    });
    this.loadMore();
  },
  onRetry() {
    this.setData({
      loading: 0
    })
    this.loadMore();
  },
  loadMore() {
    if (this.data.loading !== 0) {
      return;
    }

    this.setData({
      loading: 1
    });
    return this.getData({
      pageNum: this.page.page,
      pageSize: this.page.pageSize,
    })
    .then(res => {
      this.page.page++;
      const { data, pageCount } = res;
      this.setData({
        list: this.data.list.concat(data),
        loading: this.page.page < pageCount ? 0 : 2,
      });
    })
    .catch(err => {
      this.setData({ loading: 3 });
      Promise.reject(err);
    });
  },
  onTap() {

  },
  failed: false,
  getData({ pageNum, pageSize }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (pageNum === 2 && !this.failed) {
          // 故意制造一次失败
          this.failed = true;
          return reject();
        }
        let data = [];
        if (pageNum <= 3) {
          data = Array.from(
            new Array(pageSize),
            (_v, i) => 'item ' + ((pageNum - 1) * pageSize + i + 1),
          );
        }
        resolve({
          data,
          pageCount: data.length,
        });
      }, 1000);
    });
  },
  onPullDownRefresh_(e) {
    const { callback } = e.detail;
    setTimeout(() => {
      callback && callback();
    }, 1000);
  }
})
