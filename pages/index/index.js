//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    //判断之前是否绑定
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // 1、 已绑定， 拿后台返回的token， 存， 忽略登录页， 跳转到主页
        // 2、 未绑定， 拿后台返回的openId， 去登录页做绑定
        console.log(`code is ${res.code}`)
        wx.request({
          url: `${app.globalData.serverPath}/api/user/wxLogin`,
          data: {
            code: res.code
          },
          header: app.getHeader(),
          success(res) {
            console.log(res.data)
            if (res.data.errcode === '10000') { //未绑定，跳转到登录页
              app.globalData.openId = res.data.openId
              wx.setStorage({
                key: "openId",
                data: res.data.openid
              })
              wx.redirectTo({
                url: '/pages/login/login',
              })
            } else if (res.data.errcode === '0') {//已绑定，直接进入主界面
              app.globalData.token = res.data.data.token
              app.globalData.openId = res.data.data.user.openId
              app.globalData.roles = res.data.data.roles
              app.globalData.role = res.data.data.role
              app.globalData.user = res.data.data.user
              wx.setStorage({
                key: "openId",
                data: res.data.openid
              })
              // app.globalData.appUserInfo.name = res.data.name
              // app.globalData.appUserInfo.xh = res.data.username
              wx.switchTab({
                url: '/pages/tab-personEvaluate/personEvaluate',
              })
            } else {
              wx.showToast({
                icon: 'none',
                title: res.data.errmsg,
              })
            }
          },
          fail(res) {
            wx.showToast({
              title: JSON.stringify(res)
            })
          }
        })
        /*调试*/
      }
    })
  }
})