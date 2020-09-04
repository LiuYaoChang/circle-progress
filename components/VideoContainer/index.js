//index.js
import { debounce } from 'throttle-debounce';
//获取应用实例
Component({
  properties: {
    options: {
      type: Array,
      required: true
    }
  },
  observers: {
    'options': function(val) {
      if (Array.isArray(val)) {
        const first = val[0] || {};
        this.setData({
          channel: first.name,
          selected: first.id
        })
      }
    }
  },
  data: {
    videoContext: null,
    shareIcon: '../../assets/icon/share-icon.png',
    selected: 1,
    channel: '',
    showDropdown: true,
    showChannelPopups: false,
    showControlBar: false,
    isPlay: false,
    duration: 0,
    time: 0,
    buffered: 0
  },
  attached() {
    this.debounceFunc = debounce(1000, (num) => {
      // console.log('num:', num);
      // this.videoContext.seek(num)
    });
    this.videoContext = wx.createVideoContext('myVideo', this)
  },
  methods: {
    videoErrorCallback: function() {

    },
    // 加载视频元数据
    loadMetadata(e) {
      const { duration, width, height } = e.detail;
      this.setData({
        duration: duration
      })
    },
    // 点击video窗口
    handleTapVideo() {
      this.openControlBar();
    },
    // 点击播放按钮
    handleTapPlay(e) {
      const isPlay = e.detail;
      if (isPlay) {
        this.videoContext.play();
      } else {
        this.videoContext.pause();
      }
      this.setData({
        isPlay: isPlay
      })
      console.log('play status:', isPlay);
    },
    // 播放回调
    handleStartPlay() {
      this.setData({
        isPlay: true
      })
    },
    // 点击通道按钮
    handleChannelPress() {
      this.setData({
        showChannelPopups: true
      })
    },
    // 播放进度变化
    handleTimeUpdate(e) {
      const { currentTime, duration } = e.detail;
      this.setData({
        time: currentTime
      })
    },
    // 加载缓存数据
    handleBuffeChange(e) {
      const { buffered } = e.detail;
      const progressPercent = parseInt(buffered)
      this.setData({
        buffered: progressPercent > 100 ? 100 : progressPercent
      })
      console.log(e.detail, progressPercent);
    },
    closeChannel() {
      this.setData({
        showChannelPopups: false
      })
    },
    handleSelectChannel(e) {
      const { id } = e.currentTarget.dataset;
      const item = this.properties.options.filter(item => (item.id == id))[0] || {};
      this.setData({
        selected: item.id,
        channel: item.name
      })
    },
    openControlBar() {
      if (this.data.showControlBar) {
        this.closeControlBar();
        return false;
      }
      this.setData({
        showControlBar: true
      });
      setTimeout(() => {
        this.closeControlBar();
      }, 60000)
    },
    closeControlBar() {
      this.setData({
        showControlBar: false
      });
    },
    handleChannelChange: function(e) {

    },
    // 拖动进度条
    handleMoveProgress(e) {
      const percent = e.detail;
      const time = this.data.duration * percent / 100;
      this.debounceFunc(time)
      // console.log('time', time)
      // this.videoContext.seek()
    },
    handlePick: function() {
      this.setData({
        showDropdown: !this.data.showDropdown
      })
    }
  }
})
