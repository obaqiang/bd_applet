// pages/order_home/order_home.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hascard: '',//用户是否领卡
    hasgetcard: '',//用户是否激活
    userInfo: '',

    getvipinfo_data: '',
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    hidden: false,
    seestatus: ''

  },

  // GetCardCode: function (storeid, openid) {
  //   wx.request({
  //     url: app.globalData.bd_url + '/api/WxSP/GetCardCode',
  //     data: {
  //       storeid: storeid,
  //       openid: openid
  //     },
  //     success: function (res) {
  //       console.log(res);
  //     },
  //     fail: function (res) {
  //       console.log('获取领取会员卡接口请求失败');
  //     }
  //   })
  // },


  GetCard: function (storeid, openid) {
    var that = this
    console.log(4444)
    wx.request({
      url: app.globalData.bd_url + '/api/WxSP/GetCard',
      data: {
        storeid: storeid,
        openid: openid
      },
      success: function (res) {

        console.log(res);
        wx.addCard({
          cardList: [
            {
              cardId: res.data.Data.cardId,
              cardExt: res.data.Data.cardForMemberExtend
            }
          ],
          success: function (res) {
            console.log(222)
            console.log(res.cardList) // 卡券添加结果
            that.setData({
              hascard: true
            })

            wx.navigateTo({
              url: '../card_act/card_act'
            })

          }
        })
      },
      fail: function (res) {
        console.log('获取GetCard接口请求失败');
      }
    })
  },



  getCardact: function () {//领取会员卡跳转
    var that = this
    console.log(55555)
    console.log(app.globalData.loginfo)
    that.GetCard(app.globalData.storeid, app.globalData.loginfo.data.Data.openid)

    // wx.navigateTo({
    //   url: '../card_act/card_act'
    // })
  },

  seeCard: function () {//查看会员卡
    wx.navigateTo({
      url: '../card/card?cardcode=' + app.globalData.loginfo.data.Data.usercardcode
    })
  },

  activeCard: function () {//激活会员卡
    wx.navigateTo({
      url: '../card_act/card_act'
    })
  },

  getvipinfo: function (vip_id, token) {
    var that = this;
    wx.request({
      url: app.globalData.bd_url + '/api/member/getvipinfo',
      data: {
        vip_id: vip_id,
        token: token
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        that.setData({
          getvipinfo_data: res.data.Data,
          hidden: true
        })
        app.globalData.getvipinfo_data = res.data.Data
      },
      fail: function (res) {
        console.log('获取getvipinfo接口请求失败');
      }
    })
  },




  Tel: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.getvipinfo_data.Store.phone//仅为示例，并非真实的电话号码
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

   


    var that = this;

    app.getUserInfo(function (userInfo) {

      console.log(userInfo)
      //更新数据
      that.setData({
        userInfo: userInfo,
        // hascard: app.globalData.loginfo.data.Data.HasCard,
        // hasgetcard: app.globalData.loginfo.data.Data.HasGetCard,
      })

      // console.log(that.data.userInfo)
      wx.login({
        success: function (res) {
          console.log(res);
          if (res.code) {
            // wx.getSetting({
            //   success(res) {
            // if (!res['scope.userInfo']) {
            // wx.authorize({
            //   scope: 'scope.userInfo',
            //   success() {
            //     wx.getUserInfo({
            //       success: function (res) {
            //         console.log(323233);
            //         console.log(res)
            //         console.log({ encryptedData: res.encryptedData, iv: res.iv, code: code })
            //         //3.解密用户信息 获取unionId
            //         //...



            //       },
            //       fail: function () {
            //         console.log('获取用户信息失败')
            //       }
            //     })
            //   }
            // })
            //     }
            //   }
            // })



            //发起网络请求
            wx.request({
              url: app.globalData.bd_url + '/api/WxSP/CheckUserHasCard',
              data: {
                code: res.code,
                storeid: app.globalData.storeid,
                nickname: that.data.userInfo.nickName,
                sex: that.data.userInfo.gender
              },
              success: function (loginfo) {
                console.log(loginfo);
                that.getvipinfo(loginfo.data.Data.vip_id, loginfo.data.Data.bdtoken);
                app.globalData.loginfo = loginfo
                app.globalData.hascard = loginfo.data.Data.HasCard
                app.globalData.HasGetCard = loginfo.data.Data.HasGetCard
                that.setData({
                  hascard: loginfo.data.Data.HasCard,
                  hasgetcard: loginfo.data.Data.HasGetCard
                })

              },
              fail: function (res) {
                console.log('获取openid接口请求失败');
              }
            })
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });

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
    var that = this
    if (app.globalData.see_card_status == true) {
      that.setData({
        hascard: true,
        hasgetcard: true
      })

    }
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