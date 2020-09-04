//index.js
//获取应用实例
const app = getApp()
import { http, DOMAIN } from '../../utils/index';
Page({
  data: {
    filepath: '',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  getData () {
    http({
      url: '/'
    }).then(res => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  },
  
  handleChoose(filePath) {
    wx.chooseImage({
      count: 1,
      success: ({ tempFilePaths }) => {
        this.handleUpload(tempFilePaths[0]);
      }
    })
  },
  handleUpload(filePath) {
    wx.uploadFile({
      url: DOMAIN + '/upload',
      filePath,
      name: 'file',
      success: ({ tempFilePaths }) => {
        wx.showToast({
          title: 'upload completed'
        })
      }
    })
  },
  handleDownload() {
    wx.downloadFile({
      url: DOMAIN + '/download?id=4cbea8ac-f8ac-4f19-8374-ccd02a5997b3',
      success: (res) => {
        this.setData({
          filepath: res.tempFilePath
        })
        console.log('files', res)
      }
    })
  }
})
