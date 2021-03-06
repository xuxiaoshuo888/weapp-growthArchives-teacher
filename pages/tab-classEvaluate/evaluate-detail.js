// pages/tab-classEvaluate/evaluate-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    njlist: ['1年级', '2年级', '3年级', '4年级', '5年级', '6年级'],
    bjlist: ['1班', '2班', '3班', '4班', '5班', '6班', '7班', '8班', '9班', '10班'],
    weeklist: ['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周', '第八周', '第九周', '第十周'],
    nj: 0,
    bj: 0,
    week: 0,
    options: [{
        title: '行动',
        img: 'xd'
      },
      {
        title: '课间',
        img: 'kj'
      },
      {
        title: '保护',
        img: 'bh'
      },
      {
        title: '卫生',
        img: 'ws'
      },
      {
        title: '体检',
        img: 'tj'
      }
    ],
    activeIndex: null
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
  choose(e) {
    console.log(e)
    let tag = e.currentTarget.dataset.tag;
    let value = e.detail.value
    this.setData({
      [tag]: value
    })
  },
  toggle(e) {
    this.setData({
      activeIndex: e.currentTarget.dataset.index
    })
    console.log(e.currentTarget.dataset.index)
    console.log(this.data.activeIndex)
  },
  comfirm() {
    wx.showLoading({
      title: '提交中...',
    })
    setTimeout(() => {
      wx.hideLoading()
      wx.showToast({
        title: '提交成功！',
        duration: 2500,
        icon: 'none'
      })
    }, 2000)
  }
})