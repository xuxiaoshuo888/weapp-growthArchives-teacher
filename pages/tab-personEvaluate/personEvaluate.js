// pages/tab-personEvaluate/personEvaluate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {name:"评价打分",id:0,url:"/pages/txl/txl",img:"/img/icon-df.png"},
      {name:"个人排行",id:1,url:"/pages/range/range",img:"/img/icon-range.png"}
    ]
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
  toNext(e){
    wx.navigateTo({
      url: `${e.currentTarget.dataset.url}`,
    })
  },
  toPingJiaTongJi(e) { //评价统计
    switch (e.detail.value) {
      case '0': //教师评价按周
        wx.navigateTo({
          url: '/pages/me/tongji/jiaoshi_week/jiaoshi_week'
        });
        break;
      case '1': //教师评价按月
        wx.navigateTo({
          url: '/pages/me/tongji/jiaoshi_month/jiaoshi_month'
        });
        break;
      case '2': //家长评价
        wx.navigateTo({
          url: '/pages/me/tongji/jiazhang_week/jiazhang_week'
        })
        break;
      case '3': //班级对比按月
        wx.navigateTo({
          url: '/pages/me/tongji/banji_month/banji_month'
        });
        break;
      case '4': //班级对比按学期
        wx.navigateTo({
          url: '/pages/me/tongji/banji_term/banji_term'
        });
    }
  },
})