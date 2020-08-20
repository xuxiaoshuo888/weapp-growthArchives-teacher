
Page({

  /**
   * 页面的初始数据
   */
  data: {
    njlist: ['1年级', '2年级', '3年级', '4年级', '5年级', '6年级'],
    bjlist: ['全部', '未处理', '审核通过', '审核未通过'],
    weeklist: ['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周', '第八周', '第九周', '第十周'],
    nj: 0,
    bj: 0,
    week: 0,
    options: [{
        title: '行动',
        img: '/img/jiangzhang.png'
      },
      {
        title: '行动',
        img: '/img/jiangzhang.png'
      },
      {
        title: '行动',
        img: '/img/jiangzhang.png'
      },
      {
        title: '行动',
        img: '/img/jiangzhang.png'
      },
      {
        title: '行动',
        img: '/img/jiangzhang.png'
      }
    ],
    activeIndex: null,
    autosize:{ maxHeight: 200, minHeight: 80 },
    list:[
      {name:"刘刚",id:0,bj:'一年级一班',url:"./punish-add",img:"/img/icon-student.png",status:0,reason:"打架",task:"完成古诗默写",condition:"已按照老师要求完成任务",imglist:['/img/punish-fj1.png','/img/punish-std3.png','/img/punish-fj3.png']},
      {name:"张丽丽",id:1,bj:'二年级三班',url:"./punish-approval",img:"/img/icon-student.png",status:1,reason:"打架",task:"完成古诗默写",condition:"已按照老师要求完成任务",imglist:['/img/punish-fj1.png','/img/punish-std3.png','/img/punish-fj3.png']},
      {name:"王智",id:1,bj:'四年级五班',url:"./punish-record",img:"/img/icon-student.png",status:2,reason:"打架",task:"完成古诗默写",condition:"已按照老师要求完成任务",imglist:['/img/punish-fj1.png','/img/punish-std3.png','/img/punish-fj3.png']}
    ],
    show:false,
    autosize:{ maxHeight: 200, minHeight: 100 }
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
  },
  toApproval(){//填写审核意见
    console.log(333)
    this.setData({
      show:true
    })
  }
})