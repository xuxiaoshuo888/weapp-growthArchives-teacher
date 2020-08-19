// pages/tj/tj.js
const app = getApp();
const moment = require('../../../../utils/moment.min.js');
const md5 = require('../../../../utils/md5.min.js');
var _classIndexStoreKey;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _classArray: [],
    _classIndex: 0,
    _monday: '',
    _sunday: '',
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //本页缓存变量如果有值就用缓存的值
    _classIndexStoreKey = 'pv_' + md5(getCurrentPages()[getCurrentPages().length - 1].route) + '_classIndex';
    this.setData({
      _classIndex: wx.getStorageSync(_classIndexStoreKey) ? wx.getStorageSync(_classIndexStoreKey):0 ,
      _classArray: app.globalData.classArray,
      _monday: moment().weekday(1).format('YYYY-MM-DD'),
      _sunday: moment().weekday(6).add(1,'days').format('YYYY-MM-DD')
    })

    this.getTongjiData();
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
  
  onChangeClass:function(e){
    this.setData({
      _classIndex:e.detail.value
    });
    wx.setStorageSync(_classIndexStoreKey, e.detail.value);
    this.getTongjiData();
  },

  getTongjiData: function(e) {
    let _this = this;
    wx.request({
      url: `${app.globalData.serverPath}/api/archives/getJiaZhangPingJiaTongji`,
      method: 'POST',
      data: {
        startDay:this.data._monday,
        endDay:this.data._sunday,
        classId:this.data._classArray[this.data._classIndex].id
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
  }
})