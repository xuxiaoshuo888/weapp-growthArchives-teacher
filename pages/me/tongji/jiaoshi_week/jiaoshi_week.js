// pages/tj/tj.js
const app = getApp();
const moment = require('../../../../utils/moment.min.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _monday: '',
    _sunday: '',
    list: null,
    weiduList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
 
    this.setData({
      _monday: moment().weekday(1).format('YYYY-MM-DD'),
      _sunday: moment().weekday(6).add(1,'days').format('YYYY-MM-DD')
    })

    this.getTongjiData();
    this.setWeiduList();
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

  lastWeek: function (e) {
    this.setData({
      _monday: moment(this.data._monday).subtract(7, 'days').format('YYYY-MM-DD'),
      _sunday: moment(this.data._sunday).subtract(7, 'days').format('YYYY-MM-DD')
    })
    this.getTongjiData();
  },

  nextWeek: function(e) { 
    this.setData({
      _monday: moment(this.data._monday).add(7, 'days').format('YYYY-MM-DD'),
      _sunday: moment(this.data._sunday).add(7, 'days').format('YYYY-MM-DD')
    })
    this.getTongjiData();
  },

  getTongjiData: function(e) {
    let _this = this;
    wx.request({
      url: `${app.globalData.serverPath}/api/archives/getJiaoshiPingjiaTongjiByWeek`,
      method: 'POST',
      data: {
        startDay:this.data._monday,
        endDay:this.data._sunday
      },
      header: app.getHeader2(),
      success(res) {
        console.log(res.data);
        _this.setData(
          { list: res.data.data }
        );
      },
      fail(res) {
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: JSON.stringify(res)
        })
      }

    });
  },
  setWeiduList() {//从缓存获取维度列表
    let temp = wx.getStorageSync('weiduList')
    if (temp) {
      this.setData({
        weiduList: temp
      })
    }
  },
})