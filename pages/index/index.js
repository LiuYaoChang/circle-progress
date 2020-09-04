//index.js
//获取应用实例
const app = getApp()
import { timeTranslate } from '../../utils/util';
import MpProgress from 'mp-progress/progress.min';

Page({
  page: {
    page: 1,
    pageSize: 10
  },
  data: {
    channelTypes: [{
      id: 1,
      name: '标清'
    }, {
      id: 2,
      name: '高清'
    }, {
      id: 3,
      name: '超清'
    }],
    list: [{
      text: '详情',
      key: 1
    }, {
      text: '课件',
      key: 2
    }, {
      text: '评论',
      key: 3
    }],
    vary_width: wx.getSystemInfoSync().windowWidth * 0.5,
    config: {
      canvasSize: {
        width: 180,
        height: 180
      },
      percent: 100,
      barStyle: [{width: 4, fillStyle: '#f0f0f0'}, {width: 4, animate: true, fillStyle: '#90CBFB'}]
    },
    percentage: 60,
    tabIndex: 2,
    loading: 0
  },
    /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;

    //···第一个圆环···
    that.canvasRing = that.selectComponent("#canvasRing");
    var num = 0; //初始值，从什么值开始
    var timer = setInterval(function() {
      num++;
      if (num >= 100) { //到哪个值结束
        clearInterval(timer); //清除定时器
      }
      that.setData({
        c_val: num
      })
      that.canvasRing.showCanvasRing(); //如果有定时器 就把它放定时器里面
    }, 50);

  },
  onLoad: function () {
    // this.init();
  },
  onReachBottom() {
    this.loadMore();
  },
  loadMetadata(e) {
    const duration = e.detail.duration;
    const times = timeTranslate(duration)
    console.log(times);
  },
  // 切换tabs
  handleTabChange(e) {
    this.setData({
      tabIndex: e.detail
    })
  },
  videoErrorCallback() {

  }

})
