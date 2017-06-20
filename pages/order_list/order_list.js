// pages/order_list/order_list.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classlistdata: '',
    goodsdata: '',
    modal_status: true,
    or_num: 0,
    goods_show_first: true,
    order_pick: [],
    total_money: 0,
    hidden: false,
    choose_id: ''
  },

  // GetClassList: function (token) {//获取产品分类
  //   var that = this;
  //   wx.request({
  //     url: app.globalData.bd_url + '/api/goods/GetClassList',
  //     data: {

  //       token: token
  //     },
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     success: function (res) {

  //       // console.log('需要的token:' + token);
  //       // console.log('获取产品列表接口成功');
  //       // console.log(res);
  //       console.log(res)
  //       if (res.data.Data.ClassList.length == 0) {
  //         wx.showToast({
  //           title: '暂无数据',
  //         })
  //         that.setData({
  //           hidden: true
  //         })
  //       } else {
  //         that.setData({
  //           classlistdata: res.data.Data.ClassList
  //         })
  //         that.GetGoodsByClassID(that.data.classlistdata[0].id, app.globalData.loginfo.data.Data.bdtoken);
  //       }


  //     },
  //     fail: function (res) {
  //       console.log('获取产品分类接口请求失败');
  //     }
  //   })
  // },
  // GetGoodsByClassID: function (class_id, token) {//获取产品列表接口
  //   var that = this;
  //   wx.request({
  //     url: app.globalData.bd_url + '/api/Goods/GetGoodsByClassID',
  //     data: {
  //       class_id: class_id,
  //       token: token
  //     },
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     success: function (res) {
  //       // console.log('产品列表');
  //       console.log(res);

  //       for (var i = 0; i < res.data.Data.GoodsList.length; i++) {
  //         var num = 0;
  //         var index = i;
  //         res.data.Data.GoodsList[i].num = num;
  //         res.data.Data.GoodsList[i].index = index;
  //       }


  //       that.setData({
  //         goodsdata: res.data.Data.GoodsList,
  //         hidden: true,
  //         goods_show_first: false
  //       })

  //     },
  //     fail: function (res) {
  //       console.log('获取产品列表接口请求失败');
  //     }
  //   })
  // },




  CreateOrder: function (order_id, store_id, vip_id, member_id, amount_payable, total_amount, amount_payed, type, last_user, unvip_phone, items_json
  ) { //提交订单接口
    var that = this;
    wx.request({
      url: app.globalData.bd_url + '/api/WxSP/CreateOrder',
      data: {
        // order_id: order_id,
        store_id: store_id,
        vip_id: vip_id,
        // member_id: member_id,
        amount_payable: amount_payable,
        total_amount: total_amount,
        amount_payed: amount_payed,
        type: type,
        last_user: last_user,
        // unvip_phone: unvip_phone
        items_json: items_json
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        console.log('需要的order_id：' + order_id);
        console.log('需要的store_id：' + store_id);
        console.log('需要的vip_id：' + vip_id);
        console.log('需要的member_id：' + member_id);
        console.log('需要的amount_payable：' + amount_payable);
        console.log('需要的total_amount：' + total_amount);
        console.log('需要的amount_payed：' + amount_payed);
        console.log('需要的type：' + type);
        console.log('需要的last_user：' + last_user);
        console.log('需要的unvip_phone：' + unvip_phone);
        console.log('需要的items_json：' + items_json)

        console.log(res);

        if (res.data.Data.IsError == false) {
          wx.navigateTo({
            url: '../order_see/order_see?order_id=' + res.data.Data.OrderID + '&amount_payed=' + amount_payed + '&total_amount=' + total_amount
          })
        }
      },
      fail: function (res) {
        console.log('提交订单接口返回失败');
      }
    })
  },

  ifPick: function () {//判断商品是否已经选择
    var that = this
    var order_pick = [];
    var or_num = 0;//用户点餐总数
    var total_money = 0;//用户点餐总金额
    for (var i = 0; i < that.data.goodsdata.length; i++) {//设置用户已经选择的商品数组
      if (that.data.goodsdata[i].num != 0) {
        var money = that.data.goodsdata[i].num * that.data.goodsdata[i].goods_price
        that.data.goodsdata[i].money = money;
        order_pick.push(that.data.goodsdata[i]);

      }

    }
    that.setData({
      order_pick: order_pick,
    })
    for (var i = 0; i < that.data.order_pick.length; i++) {//设置总数量
      if (that.data.order_pick[i].num != 0) {
        or_num = or_num + that.data.order_pick[i].num;
        console.log(that.data.order_pick[i].num);
      }
      if (that.data.order_pick[i].money != 0) {//设置总金额   
        total_money = total_money + that.data.order_pick[i].money;
        console.log(that.data.order_pick[i].money);
      }
    }
    console.log('需要的数量:' + or_num);
    console.log('需要的金币:' + total_money);
    that.setData({
      or_num: or_num,
      total_money: total_money
    })
    console.log(that.data.order_pick)

  },

  orMin: function (e) {
    var that = this
    // console.log(e);
    var goods_id = e.currentTarget.dataset.goods_id
    for (var i = 0; i < that.data.goodsdata.length; i++) {//列表显示
      if (goods_id == that.data.goodsdata[i].id) {
        var num = that.data.goodsdata[i].num
        if (num > 0) {
          num--;
          var param = {};
          var string = "goodsdata[" + i + "].num";
          param[string] = num;
          that.setData(param);
        } else {
          wx.showToast({
            title: '数量不能小于0',
          })
        }
      }
    }
    that.ifPick();
  },
  orPlus: function (e) {
    var that = this
    // console.log(e);
    var goods_id = e.currentTarget.dataset.goods_id
    for (var i = 0; i < that.data.goodsdata.length; i++) {//列表显示
      if (goods_id == that.data.goodsdata[i].id) {
        var num = that.data.goodsdata[i].num
        if (num < 100) {
          num++;
          var param = {};
          var string = "goodsdata[" + i + "].num";
          param[string] = num;
          that.setData(param);
        } else {
          wx.showToast({
            title: '数量不能大于99',
          })
        }

      }
    }
    that.ifPick();
  },

  // GetOrderItemsByOrderID: function (orderid) {
  //   var that = this;
  //   wx.request({
  //     url: app.globalData.bd_url + '/api/WxSP/GetOrderItemsByOrderID',
  //     data: {
  //       orderid: orderid,
  //     },
  //     method: 'GET',
  //     header: {
  //       'content-type': 'application/json',
  //       'token': token
  //     },

  //     success: function (res) {
  //       console.log(res);

  //     },
  //     fail: function (res) {
  //       console.log('提交GetOrder接口返回失败');
  //     }
  //   })
  // },


  classCho: function (e) {//选择商品类别
    var that = this;
    console.log(e);
    var classid = e.currentTarget.dataset.classid;
    that.setData({
      choose_id: classid
    });

  },


  showModal: function () {
    var that = this
    // console.log(that.data.order_pick)
    that.setData({
      modal_status: false
    })

  },

  subOrder: function () {
    var that = this
    var items_json = []
    if (that.data.order_pick != '') {
      for (var i = 0; i < that.data.order_pick.length; i++) {
        var items = {
          goods_id: that.data.order_pick[i].id,
          order_id: '',
          price: that.data.order_pick[i].goods_price,
          qty: that.data.order_pick[i].num
        }
        items_json.push(items);
      }
      items_json = JSON.stringify(items_json);
      console.log('需要的items_json：' + items_json);
      that.CreateOrder('', app.globalData.storeid, app.globalData.loginfo.data.Data.vip_id, '', that.data.total_money, that.data.or_num, that.data.total_money, 0, '111', '', items_json)
    }

  },

  hideModal: function () {
    var that = this
    // console.log(that.data.order_pick)
    that.setData({
      modal_status: true
    })
  },
  clearPick: function () {
    var that = this
    for (var i = 0; i < that.data.goodsdata.length; i++){
      that.data.goodsdata[i].num = 0
    }

    that.setData({
      modal_status: true,
      goodsdata: that.data.goodsdata,
      order_pick: []
    })
    that.ifPick();
  },

  GetAllGoods: function (storeid) {
    var that = this;
    wx.request({
      url: app.globalData.bd_url + '/api/Goods/GetAllGoods',
      data: {
        // orderid: orderid,
      },
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'storeid': storeid,
        'token': app.globalData.loginfo.data.Data.bdtoken
      },

      success: function (res) {
        console.log(res);
        var classlistArray = []
        var goodsArray = []
        for (var i = 0; i < res.data.Data.ClassList.length; i++) {
          var classlist = {}
          classlist.class_name = res.data.Data.ClassList[i].class_name
          classlist.id = res.data.Data.ClassList[i].id
          classlistArray.push(classlist)


          for (var j = 0; j < res.data.Data.ClassList[i].GoodsList.length; j++) {
            res.data.Data.ClassList[i].GoodsList[j].num = 0
            goodsArray.push(res.data.Data.ClassList[i].GoodsList[j])
          }
        }
        console.log(1)
        console.log(classlistArray);
        console.log(goodsArray)
        that.setData({
          classlistdata: classlistArray,
          goodsdata: goodsArray,
          choose_id: res.data.Data.ClassList[0].id,
          hidden: true
        })

      },
      fail: function (res) {
        console.log('提交GetAllGoods接口返回失败');
      }
    })
  },






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.GetAllGoods(app.globalData.storeid);


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