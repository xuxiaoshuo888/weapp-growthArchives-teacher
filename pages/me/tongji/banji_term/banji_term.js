const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    T: true,
    dimensionalityId: '-1', //维度，-1全部
    weiduList: [], //维度list
    xqList: [1, 2],
    xnList: [],
    xn: '2019-2020',
    xq: '1',
    banji_list: [{
      bj_id: '001', //班级id
      growths: '280', //班级总分
      class_name: '一班', //班级名称
      year: '2020', //年度
      nj: '五年级', //年级
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setWeiduList();
    this.setXnList()
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
    this.getData()
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
  setWeiduList() {
    let temp = wx.getStorageSync('weiduList')
    if (temp) {
      this.setData({
        weiduList: temp
      })
    }
  },
  setXnList() {
    let temp = wx.getStorageSync('xnList')
    if (temp) {
      this.setData({
        xnList: temp
      })
    }
  },
  getData() {
    let _this = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: `${app.globalData.serverPath}/api/archives/getBanJiDuiBiByXn`,
      method: 'POST',
      data: {
        dimensionalityId: _this.data.dimensionalityId, //维度
        xn: _this.data.xn,
        xq: _this.data.xq
      },
      header: app.getHeader2(),
      success(res) {
        console.log(res.data)
        wx.hideLoading()
        if (res.data.errcode === '0') {
          _this.processList(res.data.data);
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
  processList(e) {
    let max = '';
    let numList = [];
    if (e.length > 1) {
      e.forEach((item) => {
        numList.push(item.growths)
      })
      max = Math.max(...numList)
      e.forEach((item) => {
        if (max > 0) {
          if (item.growths == 0) {
            item.percent = 0;
          } else {
            item.percent = (item.growths / max) * 100
          }
        } else {
          item.percent = 0
        }
      })
      this.setData({
        banji_list: e
      })
    }

  },
  chooseXn(e) {
    let _this = this
    console.log(e)
    let index = e.detail.value
    this.setData({
      xn: _this.data.xnList[e.detail.value].label
    })
    this.getData()
  },
  chooseXq(e) {
    let _this = this
    console.log(e)
    let index = e.detail.value
    this.setData({
      xq: _this.data.xqList[e.detail.value]
    })
    this.getData()
  },
  chooseMonth(e) {
    let str = e.detail.value //2020-09
    let temp = str.split('-')
    this.setData({
      year: temp[0],
      month: temp[1]
    })
    this.getData() //获取数据，更新图表数据
  },
  onChange(e) {
    this.setData({
      dimensionalityId: e.detail.name
    })
    this.getData()
  }
})