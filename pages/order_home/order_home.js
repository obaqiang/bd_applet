// pages/order_home/order_home.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hascard: '',
    vip_id:'',
    token:'',
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    hotList: [
      {
        pic: 'http://img.bdvip.net/wxsmprogram/140px_120px_tup.png',
        title: '玻璃棧道',
        desc: '22W人去過'
      }, {
        pic: 'http://img.bdvip.net/wxsmprogram/140px_120px_tup.png',
        title: '玻璃棧道',
        desc: '22W人去過'
      }, {
        pic: 'http://img.bdvip.net/wxsmprogram/140px_120px_tup.png',
        title: '玻璃棧道',
        desc: '22W人去過'
      }, {
        pic: 'http://img.bdvip.net/wxsmprogram/140px_120px_tup.png',
        title: '玻璃棧道',
        desc: '22W人去過'
      }, {
        pic: 'http://img.bdvip.net/wxsmprogram/140px_120px_tup.png',
        title: '玻璃棧道',
        desc: '22W人去過'
      }
    ]
  },


  getCard: function () {//领取会员卡跳转
    wx.navigateTo({
      url: '../card_act/card_act'
    })
  },

  seeCard: function () {//查看会员卡

  },

  getvipinfo: function (vip_id, token) {
    wx.request({
      url: app.globalData.bd_url+'/api/member/getvipinfo',
      data: {
        vip_id: vip_id,
        token: token
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        
        console.log(res);
      },
      fail: function (res) {
        console.log('获取openid接口请求失败');
      }
    })
  },




  Tel: function () {
    wx.makePhoneCall({
      phoneNumber: '1340000' //仅为示例，并非真实的电话号码
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // app.getUserInfo(function (userInfo) {
    //   //更新数据
    //   that.setData({
    //     userInfo: userInfo
    //   })
    //   console.log(app.globalData.userInfo);
    // })
    console.log(app.globalData);
    // console.log(app);
   
    console.log('需要的vip_id：' + app.globalData.vip_id);
    console.log('需要的token:' + app.globalData.token);
    app.getUserInfo();
    
    that.getvipinfo(app.globalData.vip_id, app.globalData.token);


    that.setData({
      hascard: app.globalData.HasCard
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