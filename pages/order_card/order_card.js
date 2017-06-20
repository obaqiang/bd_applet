// pages/order_card/order_card.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardcode: '',
    getvipinfo_data: '',
    hidden: true,
    nocancel: false,
    img_url: ''
  },

  cardJump: function () {

    if (app.globalData.loginfo.data.Data.HasCard == false || app.globalData.loginfo.data.Data.HasGetCard == false) {
      wx.showToast({
        title: '请先领取并激活会员卡',
      })
    } else {
      wx.navigateTo({
        url: '../card_detail/card_detail'
      })
    }


  },


  seeOrderJump: function (e) {
    console.log(e)
    var status = e.currentTarget.dataset.status
    wx.navigateTo({
      url: '../my_order/my_order?status=' + status
    })
  },

  GetQrCode: function (storeid, openid, unionid) {
    var that = this;
    wx.request({
      url: app.globalData.bd_url + '/api/WxSP/GetQrCode',
      data: {
        storeid: storeid,
        openid: openid,
        unionid: unionid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('条形码接口开始')
        console.log(res);
        that.setData({
          cardcode: res.data.Data.codedata
        })


      },
      fail: function (res) {
        console.log('获取条形码接口请求失败');
      }
    })
  },




  seeCodeJump: function () {
    if (app.globalData.loginfo.data.Data.HasCard == false || app.globalData.loginfo.data.Data.HasGetCard == false) {
      wx.showToast({
        title: '请先领取并激活会员卡',
      })
    } else {
      wx.navigateTo({
        url: '../barcode/barcode'
      })
    }

  },

  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // var cardcode = options.cardcode
    that.GetQrCode(app.globalData.storeid, app.globalData.loginfo.data.Data.openid, app.globalData.loginfo.data.Data.unionid)
    
    that.setData({
      // cardcode: cardcode,
      getvipinfo_data: app.globalData.getvipinfo_data
    })
    // that.GetQrCode(app.globalData.storeid, app.globalData.loginfo.data.Data.openid)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})