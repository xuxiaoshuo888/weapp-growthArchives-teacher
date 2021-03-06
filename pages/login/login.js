// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // username: "2016121119000451",
    // password: "Sibe2016",
    username: "",
    password: "",
    pwdFocus: false,
    userFocus: true,
    opneId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.showModal({
        title: '说明',
        content: '本程序仅供武汉广埠屯小学清江景城分校教师内部进行学生评价使用。家长使用请搜索小程序“成长嘉奖令+”',
        showCancel:false
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
    if (app.globalData.openId) {
      this.setData({
        opneId: app.globalData.openId
      })
    } else {
      let o = wx.getStorageSync('openId')
      this.setData({
        opneId: o
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

  },
  setUsername: function (e) {
    this.setData({
      username: e.detail.value
    });
  },
  setPassword: function (e) {
    this.setData({
      password: e.detail.value
    });
  },
  handleConfirmUser: function (e) {
    this.setData({
      userFocus: false
    });
    this.setData({
      pwdFocus: true
    });
  },
  handleConfirmPwd: function (e) {
    this.setData({
      pwdFocus: false
    });
    this.login();
  },
  login: function () {
    if (!this.data.username) {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none',
        mask: true
      })
      this.setData({
        userFocus: true
      });
      return;
    }
    if (!this.data.password) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        mask: true
      })
      this.setData({
        pwdFocus: true
      });
      return;
    }
    let _this = this;
    wx.showLoading({
      title: '登录中，请稍候...',
      mask: true
    })
    wx.request({
      url: `${app.globalData.serverPath}/api/user/login`,
      method: 'POST',
      header: app.getHeader2(),
      data: {
        username: _this.data.username,
        password: _this.data.password,
        openId: _this.data.opneId
      },
      header: app.getHeader(),
      success(res) {
        console.log(res)
        wx.hideLoading()
        if (res.data.errcode == '0') {//登录成功-home
          app.globalData.token = res.data.token
          app.globalData.roles = res.data.roles
          app.globalData.role = res.data.role
          app.globalData.user = res.data.userInfo
          wx.switchTab({
            url: '/pages/txl/txl',
          })
        } else {//提示错误信息
          wx.showToast({
            icon:'none',
            title: res.data.errmsg,
          })
        }
      },
      fail(res) {
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: JSON.stringify(res)
        })
      }
    })
  }
})