//index.js

Component({
  properties: {
    options: {
      type: Array,
      required: true
    },
    channel: String,
    time: Number,
    duration: {
      type: Number,
      default: 0
    },
    status: {
      type: Boolean,
      default: false
    },
    buffered: {
      type: Number,
      default: 0
    }
  },
  data: {
    playIcon: '../../assets/icon/paush.png',
    fullIcon: '../../assets/icon/expend.png',
    isPlay: false
  },
  observers: {
    'status': function(val) {
      this.setData({
        playIcon: val ? '../../assets/icon/stop.png' : '../../assets/icon/paush.png'
      })
    }
  },
  methods: {
    // 切换通道
    onPressChannel() {
      this.triggerEvent('onPressChannel');
    },
    // 全屏
    onPressExpend() {
      this.triggerEvent('expend');
    },
    onPressPlay() {
      this.setData({
        isPlay: !this.data.isPlay,
        playIcon: this.properties.status ? '../../assets/icon/paush.png' : '../../assets/icon/stop.png'
      }, () => {
        this.triggerEvent('play', this.data.isPlay);
      })
    },
    // 拖动进度条
    handleProgressChange(e) {
      console.log('move progress', e.detail)
      this.triggerEvent('change', e.detail);
    }
  }

})
