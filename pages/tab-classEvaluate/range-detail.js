// pages/tab-classEvaluate/range-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    njlist: ['2020-2021学年第一学期', '2019-2020学年第一学期', '2019-2020学年第二学期', '2018-2019学年第一学期', '2018-2019学年第二学期'],
    bjlist: ['全部', '行动', '保护', '卫生', '体检'],
    weeklist: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],
    nj: 0,
    bj: 0,
    week: 0,
    options: [{
        title: '行动',
        img: '/img/jiangzhang.png',
        score:29
      },
      {
        title: '保护',
        img: '/img/jiangzhang.png',
        score:25
      },
      {
        title: '卫生',
        img: '/img/jiangzhang.png',
        score:23
      },
      {
        title: '体检',
        img: '/img/jiangzhang.png',
        score:26
      },
      {
        title: '行动',
        img: '/img/jiangzhang.png',
        score:28
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
  }
})