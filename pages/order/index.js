//index.js
//获取应用实例
const app = getApp()
import { fly } from '../../utils/index';
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })

    fly.get('/index').then(res => {
      console.log(res);
    })
  }
})
