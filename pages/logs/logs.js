//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    logs: []
  },
  onShow: function () {
    this.setData({
      logs: wx.getStorageSync('cities')
    })
  }
})
