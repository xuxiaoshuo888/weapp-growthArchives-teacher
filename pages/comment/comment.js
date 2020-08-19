// pages/comment/comment.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: [], //选中的评价[{id:'',num:9},{}]
    namelist: [], //上个页面选中的名字列表
    optionsList: [], //备选项列表，四个维度及其下属相应的选项
    classId: '', //上个页面传过来的
  },
  onChange(e) { //将选择的项目的编号记录下来
    console.log(e)
    console.log(this.data.result)
    let index = e.currentTarget.dataset.index
    let result = this.data.result
    result[index].id = e.detail
    if (result[index].num == 0) { //如果选之前是0，选中之后，数量变为1
      let list = this.data.result
      list[index].num = 1
      this.setData({
        result: list
      })
    }
    this.setData({
      result: result
    });
    console.log(this.data.result)
  },
  onchangeNum(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index
    let result = this.data.result
    result[index].num = e.detail
    this.setData({
      result: result
    });
    console.log(this.data.result)
  },
  comfirm() { //提交评价
    let classId = this.data.classId;
    let idlist = wx.getStorageSync('chooseidlist'); //学生id数组
    let m = {
      students: idlist,
      items: this.data.result
    }
    console.log(m);
    let flag = false; //至少选中一个选项
    m.items.forEach((item) => {
      if (item) {
        flag = true
      }
    })
    if (flag) {
      //封装数据
      //将封装table
      wx.showLoading({
        title: '提交中...',
        mask: true
      })
      wx.request({
        url: `${app.globalData.serverPath}/api/archives/addRewardByWx`,
        method: 'POST',
        data: {
          classId: classId,
          table: JSON.stringify(m)
        },
        header: app.getHeader2(),
        success(res) {
          console.log(res.data)
          wx.hideLoading()
          if (res.data.errcode === '0') {
            wx.showToast({
              icon: 'none',
              title: res.data.errmsg
            })
            //提交成功后需要清除id   的 list缓存
            wx.removeStorageSync('chooseidlist')
            wx.removeStorageSync('choosenamelist')
            setTimeout(function() {
              wx.switchTab({
                url: '/pages/txl/txl',
              })
            }, 2000)
          } else {
            wx.showToast({
              icon: 'none',
              title: res.data.errmsg
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
    } else {
      wx.showToast({
        title: '请至少选择一项',
        icon: 'none',
        duration: 3000,
        mask: true
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.classId) {
      this.setData({
        classId: options.classId
      })
    }
    this.getData()
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
    let value = wx.getStorageSync('choosenamelist')
    console.log(value)
    this.setData({
      namelist: value
    })
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
  getData: function() {
    let _this = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: `${app.globalData.serverPath}/api/dimensionality/getDimensionalitys`,
      method: 'POST',
      data:{
        type:'all'
      },
      header: app.getHeader2(),
      success(res) {
        console.log(res.data)
        wx.hideLoading()
        if (res.data.errcode === '0') {
          _this.setData({
            optionsList: res.data.data
          })
          let list = []
          //根据维度数生成 单选组 绑定数组的长度
          _this.data.optionsList.forEach((item) => {
            list.push({
              id: '',
              num: 0
            })
          })
          _this.setData({
            result: list
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