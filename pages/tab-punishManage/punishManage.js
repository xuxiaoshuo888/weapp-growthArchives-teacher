// pages/tab-punishManage/punishManage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {name:"惩罚通知",id:0,url:"./punish-add",img:"/img/icon-bell.png",nums:'',subtitle:'新增惩罚通知'},
      {name:"惩罚审核",id:1,url:"./punish-approval",img:"/img/icon-2.png",nums:6,subtitle:'家长提交证据，老师消除虫子'},
      {name:"惩罚记录",id:1,url:"./punish-record",img:"/img/icon-record.png",nums:18,subtitle:'教师发布惩罚任务的记录'}
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
  }
})