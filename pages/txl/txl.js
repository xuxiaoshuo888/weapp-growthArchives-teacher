// pages/txl/txl.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  getData: function() {
    let _this = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: `${app.globalData.serverPath}/api/archives/getClassInfoList`,
      method: 'POST',
      header: app.getHeader2(),
      success(res) {
        console.log(res.data)
        wx.hideLoading()
        if (res.data.errcode === '0') {
          _this.setData({
            list: res.data.data
          })
          app.globalData.classArray = res.data.data;//稳定的数据保存到全局变量中

        } else {
          wx.showToast({
            icon:'none',
            title: res.data.errmsg,
          })
        }
      },
      fail(res) {
        wx.hideLoading()
        //网络异常时，提示，点击确认后继续刷新数据
        wx.showModal({
          title: '提示',
          content: '请检查您的网络' + JSON.stringify(res),
          showCancel: false,
          confirmColor: '#41B65A',
          success: function(res) {
            if(res.confirm){
              _this.getData()
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData()
    this.getWeiduList();//获取维度list,//以备排行页面使用
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  toBj: function(e) {
    console.log(e.currentTarget.dataset.id)
    // wx.setStorage({//存classid
    //   key: 'classid',
    //   data: e.currentTarget.dataset.id,
    // })
    wx.navigateTo({
      url: `/pages/bj/bj?id=${e.currentTarget.dataset.id}`,
    })
  },
  getWeiduList: function () { //获取维度list
    let _this = this;
    // wx.showLoading({
    //   title: '加载中...',
    //   mask: true
    // })
    wx.request({
      url: `${app.globalData.serverPath}/api/dimensionality/getDimensionalitys`,
      method: 'POST',
      header: app.getHeader2(),
      success(res) {
        console.log(res.data)
        wx.hideLoading()
        if (res.data.errcode === '0') {
          wx.setStorageSync('weiduList', res.data.data)
        } else {
          wx.showToast({
            icon: 'none',
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
  },
  scanCode(){
    let _this = this;
    wx.scanCode({
      onlyFromCamera: false,//可从相册获取二维码
      scanType: ['qrCode'],
      success: function(res) {
        console.log(res.result)
        console.log(res.result.substring(0, 10))
        if (res.result && (res.result.substring(0, 10) === 'studentId=')){
          _this.commentbyQrcode(res.result)
        }else{
          wx.showModal({
            title: '提示',
            content: '你扫描的二维码内容不正确，请确认是学生的二维码',
            showCancel: false,
            confirmColor: '#41B65A',
            success: function (res) {

            }
          })
        }
      },
      // fail: function(res) {
      //   wx.showToast({
      //     icon: 'none',
      //     title: JSON.stringify(res)
      //   })
      // }
    })
  },
  commentbyQrcode(e){
    let _this = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    let nameList = [];
    let idList = [];
    //通过studentId拿学生信息
    wx.request({
      url: `${app.globalData.serverPath}/api/student/getStudentInfo?${e}`,
      header: app.getHeader2(),
      success(res) {
        console.log(res.data)
        wx.hideLoading()
        if (res.data.errcode === '0') {
          idList.push(res.data.data.id);
          nameList.push(res.data.data.user_name);
          wx.setStorageSync('chooseidlist', idList)
          wx.setStorageSync('choosenamelist', nameList)
          wx.navigateTo({
            url: `/pages/comment/comment?classId=${res.data.data.p_class_id}`
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.errmsg + '你扫描的二维码内容不正确，请确认是学生的二维码',
            showCancel: false,
            confirmColor: '#41B65A',
            success: function(res) {
          
            }
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