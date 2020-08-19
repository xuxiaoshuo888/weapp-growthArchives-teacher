// pages/tj/tj.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    _year: '',
    _month: '',
    list: null,
    weiduList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var d = new Date();

    // console.log(d.getFullYear()+'-'+d.getMonth());
    this.setData({
      _year: d.getFullYear(),
      _month: d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1
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

  bindDateChange: function(e) {
    let y = e.detail.value.substring(0, 4);
    let m = e.detail.value.substring(5)
    
    this.setData({
      _year: y,
      _month: m,
    })

    this.getTongjiData();
  },

  getTongjiData: function(e) {
    let _this = this;
    wx.request({
      url: `${app.globalData.serverPath}/api/archives/getJiaoshiPingjiaTongji`,
      method: 'POST',
      data: {
        year: _this.data._year,
        month: _this.data._month
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