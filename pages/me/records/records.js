// pages/me/jl.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cIndex: 0,
    list: [],
    list2: [],
    pageNum: 1,
    pageSize: 300,
    records: 0,
    viewEnd: 0,
    sticky:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData_init_cz()
    this.getData_init_jz()
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
  getData_init_cz: function () {//数据初始化-按操作
    let _this = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: `${app.globalData.serverPath}/api/archives/getMyPingJiaRecordsByOperate`,
      method: 'POST',
      data: {
        pageNum: _this.data.pageNum,
        pageSize: _this.data.pageSize
      },
      header: app.getHeader2(),
      success(res) {
        console.log(res.data)
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
        wx.hideLoading()
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
  getData_init_jz: function () {//数据初始化-按奖章
    let _this = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: `${app.globalData.serverPath}/api/archives/getMyPingJiaRecords`,
      method: 'POST',
      data: {
        pageNum: _this.data.pageNum,
        pageSize: _this.data.pageSize
      },
      header: app.getHeader2(),
      success(res) {
        console.log(res.data)
        if (res.data.errcode === '0') {
          _this.setData({
            list2: res.data.data.rows,
            pageNum: res.data.data.page,
            pageSize: res.data.data.pageSize,
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: res.data.errmsg,
          })
        }
        wx.hideLoading()
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
  switchTab(e){
    console.log(e)
    this.setData({
      cIndex:e.detail.index
    })
    //更新数据
    this.getData_init_cz()
    this.getData_init_jz()
  },
  delete(e){//按奖章删除
  console.log(e)
    let _this = this;
    let id = e.currentTarget.dataset.item.id;
    wx.showModal({
      title: '提示',
      content: '确认删除该记录？',
      showCancel: true,
      confirmColor: '',
      success: function(res) {
        if(res.confirm){
          _this.delete_jz(id)
        }
      }
    })
  },
  delete2(e) {//按操作删除
    let _this = this;
    wx.showModal({
      title: '提示',
      content: '确认删除该记录？',
      showCancel: true,
      confirmColor: '',
      success: function (res) {
        if (res.confirm) {
          _this.delete_cz(e)
        }
      }
    })
  },
  delete_jz(e){//按奖章删除
    let _this = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: `${app.globalData.serverPath}/api/archives/removeByJz`,
      method: 'POST',
      data: {
        ids:e
      },
      header: app.getHeader2(),
      success(res) {
        console.log(res.data)
        wx.hideLoading()
        if (res.data.errcode === '0') {
          wx.showToast({
            icon: 'success',
            title: res.data.errmsg,
          })
          _this.getData_init_cz()
          _this.getData_init_jz()
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
  delete_cz(e) {//按操作删除
    let _this = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: `${app.globalData.serverPath}/api/archives/removeByCz`,
      method: 'POST',
      data: {
        pjsj: e.currentTarget.dataset.item.pjsj,
        cjr_id: e.currentTarget.dataset.item.cjr_id
      },
      header: app.getHeader2(),
      success(res) {
        console.log(res.data)
        wx.hideLoading()
        if (res.data.errcode === '0') {
          wx.showToast({
            icon: 'success',
            title: res.data.errmsg,
          })
          _this.getData_init_cz()
          _this.getData_init_jz()
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
  }
})