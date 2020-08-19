// pages/dongtai/dongtai.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    pageNum: 1,
    pageSize: 20,
    records: 0,
    viewEnd: 0,
    currentType: 'all',//week,month,term,all
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getData_init()
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
    console.log(this.data);
    if (this.data.viewEnd < this.data.records) { //当前浏览的最后一条记录小于最大记录，则继续拉取数据，否则不管了
      let pageNum = this.data.pageNum;
      this.setData({
        pageNum: pageNum + 1
      })
      this.getData()
    } else {
      wx.showToast({
        icon: 'none',
        title: '没有更多数据了',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getData: function () {//上滑加载
    let _this = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: `${app.globalData.serverPath}/api/archives/getDongTaiData`,
      method: 'POST',
      data: {
        pageNum: _this.data.pageNum,
        size: _this.data.pageSize
      },
      header: app.getHeader2(),
      success(res) {
        console.log(res.data)
        wx.hideLoading()
        let list = _this.data.list
        if (res.data.errcode === '0') {
          _this.setData({
            list: list.concat(res.data.data.rows),
            pageNum: res.data.data.page,
            pageSize: res.data.data.pageSize,
          })
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
  getData_init: function () {//数据初始化
    let _this = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: `${app.globalData.serverPath}/api/archives/getDongTaiData`,
      method: 'POST',
      data: {
        pageNum: _this.data.pageNum,
        size: _this.data.pageSize
      },
      header: app.getHeader2(),
      success(res) {
        console.log(res.data)
        wx.hideLoading()
        if (res.data.errcode === '0') {
          _this.setData({
            list: res.data.data.rows,
            pageNum: res.data.data.page,
            pageSize: res.data.data.pageSize,
          })
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
})