// pages/order_see/order_see.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_id: '',
    store_name: '',
    currentdate: '',
    pay_ok: false,
    orderitems:[],
    total_amount: '',
    amount_payable:'',
    send_no:'',
    amount_payed:''
  },


  CheckOrder: function (order_id, weixin_pay_no, type) {
    var that = this;
    wx.request({
      url: app.globalData.bd_url + '/api/WxSP/CheckOrder',
      data: {
        order_id: order_id,
        weixin_pay_no: weixin_pay_no,
        type: type//4取消，0正常确认
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        if (res.data.Data.IsError == false) {
          var send_no = res.data.Data.send_no
          wx.showToast({
            title: '取货单号：' + send_no,
          })
        }

      },
      fail: function (res) {
        console.log('提交CheckOrder接口返回失败');
      }
    })
  },


  CreateWeixinOrder: function (store_id, order_id, open_id) {
    var that = this;
    wx.request({
      url: app.globalData.bd_url + '/api/WxSP/CreateWeixinOrder',
      data: {
        store_id: store_id,
        order_id: order_id,
        open_id: open_id

      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('需要的store_id：' + store_id);
        console.log('需要的order_id：' + order_id);
        console.log('需要的open_id：' + open_id);

        console.log(res);
        if (res.data.Data.IsError == false) {
          console.log(res.data.Data.weixin_pay_no);
          console.log(order_id);
          that.CheckOrder(order_id, res.data.Data.weixin_pay_no, 0)
          wx.navigateTo({
            url: '../my_order/my_order'
          })
        }
      },
      fail: function (res) {
        console.log('提交CreateWeixinOrder接口返回失败');
      }
    })
  },

  GetOrderItemsByOrderID: function (orderid) {
    var that = this;
    wx.request({
      url: app.globalData.bd_url + '/api/WxSP/GetOrderItemsByOrderID',
      data: {
        orderid: orderid,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('GetOrderItemsByOrderID返回数据');
        console.log(res);
        that.setData({
          orderitems:res.data.Data.OrderItems,
          send_no: res.data.Data.send_no
        })
      },
      fail: function (res) {
        console.log('提交GetOrderItemsByOrderID接口返回失败');
      }
    })
  },



  surePay: function () {//用户点击付款按钮

    var that = this
    that.CreateWeixinOrder(app.globalData.storeid, that.data.order_id, app.globalData.loginfo.data.Data.openid)
  },

  cancelPay: function () {//用户点击取消订单
    var that = this
    that.CheckOrder(that.data.order_id, '', 4);
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // console.log(app.globalData.getvipinfo_data);
    var currentdate = util.getNowFormatDate();
    console.log(currentdate);
    var that = this
    that.setData({
      order_id: options.order_id,
      currentdate: currentdate,
      store_name: app.globalData.getvipinfo_data.Store.store_namem,
      total_amount: options.total_amount,
      amount_payable: options.amount_payable,
      amount_payed: options.amount_payed
    })
    var pay_status = options.pay_status
    if (options.text_status == 'status_2') {//待付款
      that.setData({
        pay_ok: false
      })
      that.GetOrderItemsByOrderID(options.order_id)
    } else if (options.text_status == 'status_3'){//未完成
      that.setData({
        pay_ok: true
      })
      that.GetOrderItemsByOrderID(options.order_id)
    } else if (options.text_status == 'status_1') {//已完成
      that.setData({
        pay_ok: true
      })
      that.GetOrderItemsByOrderID(options.order_id)
    }



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