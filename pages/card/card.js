
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    cardcode: '',
    getvipinfo_data: '',

    img_url:''
  },

  cardJump: function () {
    wx.navigateTo({
      url: '../card_detail/card_detail'
    })
  },

  seeCode: function () {
    var that = this
    that.setData({
      hidden: false
    })
  },

  seeCodeJump: function () {
    wx.navigateTo({
      url: '../barcode/barcode'
    })
  },

  

  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData.loginfo);
    var that = this
    var cardcode = options.cardcode
    
    that.setData({
      cardcode: cardcode,
      getvipinfo_data: app.globalData.getvipinfo_data
    })

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