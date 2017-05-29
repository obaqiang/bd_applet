//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this
    //调用登录接口
    wx.login({
      success: function (res) {
        // console.log(res);
        // wx.getUserInfo({
        //   success: function (res) {
        //     that.globalData.userInfo = res.userInfo
        //     typeof cb == "function" && cb(that.globalData.userInfo)
        //   }
        // })
        if (res.code) {
          var gender;//性别发送给后台
          var nickname;//昵称发送给后台
          wx.getUserInfo({
            success: function (ui) {
              // console.log(res);
              gender = ui.userInfo.gender;
              nickname = ui.userInfo.nickName;
              //发起网络请求
              wx.request({
                url: 'https://testapi.ks12580.net/api/WxSP/CheckUserHasCard',
                data: {
                  code: res.code,
                  storeid: '713',
                  sex: gender,
                  nickname: nickname
                },
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  console.log(res)
                  // console.log(that.globalData)
                  that.globalData.HasCard = res.data.Data.HasCard;
                  that.globalData.token = res.data.Data.bdtoken;
                  that.globalData.vip_id = res.data.Data.vip_id
                  that.setData({
                    globalData: that.globalData
                  })
                },
                fail: function (res) {
                  console.log('获取openid接口请求失败');
                }
              })
            }
          })



        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }


    })

  },
  globalData: {
    userInfo: null,
    bd_url: 'https://testapi.ks12580.net',
    HasCard: '',//判断用户是否已经有卡
    token: '',
    vip_id: ''
  }
})