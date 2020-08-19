// pages/bj/bj.js
const app = getApp()
Page({
  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    classId: '',
    list_txl: [],
    result: [], //选中的学生id列表
    resultxm: [], //选中的学生姓名列表
    dataBell:{},
    list2: [{//数据示例
        alphbet: 'A',
        list: [{}, {}, {}, {}]
      },
      {
        alphbet: 'B',
        list: [{}, {}, {}, {}]
      },
      {
        alphbet: 'C',
        list: [{}, {}, {}, {}]
      }
    ],
    isSelectAll: false, //没有全选
  },
  select_toggle(item){
    const checkbox = this.selectComponent(`.checkboxes-${item}`);
    checkbox.toggle();
  },
  selectAll() {
    let _this = this
    if (this.data.isSelectAll) { //如果已全选，则取消全选
    console.log('取消全选')
      let list = this.data.list_txl;
      list.forEach((item) => {
        if (item.list.length > 0) {
          item.list.forEach((item_son) => {
            _this.select_toggle(item_son.id)
          })
        }
      })
      wx.removeStorageSync('chooseidlist')
      wx.removeStorageSync('choosenamelist')
      this.setData({
        isSelectAll: false
      })
    } else { //如果没有全选则，进行全选
      //循环所有的，存idlist和xmlist到缓存
      console.log('全选')
      let list = this.data.list_txl;
      let idList = [];
      let nameList = [];
      list.forEach((item) => {
        if (item.list.length > 0) {
          item.list.forEach((item_son) => {
            idList.push(item_son.id)
            nameList.push(item_son.userName)
            _this.select_toggle(item_son.id)
          })
        }
      })
      wx.setStorageSync('chooseidlist', idList) //存id数组
      wx.setStorageSync('choosenamelist', nameList) //存姓名数组
      this.setData({
        isSelectAll:true
      })
    }
  },
  todetail() { //查看，传学生id
    let _this = this;
    let result = this.data.result;
    let blist = this.data.list_txl;
    let resultxm = [];
    result.forEach((item) => {
      blist.forEach((item2) => {
        for (let i = 0; i < item2.list.length; i++) {
          if (item === item2.list[i].id) {
            resultxm.push(item2.list[i].userName)
            return
          }
        }
      })
    })
    console.log(resultxm)
    this.setData({
      resultxm: resultxm
    })
    wx.setStorageSync('chooseidlist', _this.data.result) //存id数组
    wx.setStorageSync('choosenamelist', _this.data.resultxm) //存姓名数组
    wx.navigateTo({
      url: '/pages/pl/pl',
    })
  },
  toComment() { //跳转到评论界面
    let _this = this;
    if (this.data.result.length === 0) {
      wx.showToast({
        title: '请至少选择一人',
        icon: 'none',
        duration: 3000,
        mask: true
      })
    } else {
      //通过学生ID数组 去遍历 姓名列表
      let result = this.data.result;
      let blist = this.data.list_txl;
      let resultxm = [];
      let bellNameList = ''
      result.forEach((item) => {
        blist.forEach((item2) => {
          for (let i = 0; i < item2.list.length; i++) {
            if (item === item2.list[i].id) {
              console.log(item2.list[i].bellFlag)
              if (item2.list[i].bellFlag && item2.list[i].bellFlag == true){
                bellNameList += `${item2.list[i].userName},`
                
              }
              resultxm.push(item2.list[i].userName)
              return
            }
          }
        })
      })
      
      console.log(resultxm)
      // if (bellNameList){//如果选中有警铃的同学，则不允许进入评价界面
      //   wx.showToast({
      //     title: `您选择的${bellNameList}同学因为受到警铃而被禁评，请先从禁评名单中移除该学生！`,
      //     icon: 'none'
      //   })
      //   return
      // }
      this.setData({
        resultxm: resultxm
      })
      // return//调试
      wx.setStorageSync('chooseidlist', _this.data.result) //存id数组
      wx.setStorageSync('choosenamelist', _this.data.resultxm) //存姓名数组
      wx.navigateTo({
        url: `/pages/comment/comment?classId=${_this.data.classId}`,
      })
    }
  },
  onChange(e) {
    //生成学生id数组
    this.setData({
      result: e.detail
    });
    console.log(this.data.result)
  },
  toggle(event) {
    console.log(event)
    const {
      index,
      stdid,
      stdname
    } = event.currentTarget.dataset;

    const checkbox = this.selectComponent(`.checkboxes-${stdid}`);
    checkbox.toggle();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      classId: options.id
    })
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
    this.getData()
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
  getData: function() {//拿去学生列表
    let _this = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: `${app.globalData.serverPath}/api/student/getStudentList`,
      method: 'POST',
      data: {
        classId: _this.data.classId
      },
      header: app.getHeader2(),
      success(res) {
        console.log(res.data)
        wx.hideLoading()
        if (res.data.errcode === '0') {
          _this.setData({
            list_txl: res.data.data
          })
          _this.getDataError()//拿处罚列表
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
  getDataError: function () {//拿去学生警铃列表
    let _this = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: `${app.globalData.serverPath}/api/student/getStudentErrorList`,
      method: 'POST',
      data: {
        classId: _this.data.classId
      },
      header: app.getHeader2(),
      success(res) {
        console.log(res.data)
        wx.hideLoading()
        //拿到数据后，进行比对，并添加bellFlag标识
        _this.setData({
          dataBell:res.data.data
        })
        let dataBell = _this.data.dataBell
        let list = _this.data.list_txl
        list.forEach((item)=>{
          if(item.list.length>0){
            item.list.forEach((std)=>{
              let k = `w_${std.id}`
              console.log(dataBell[k])
              if (dataBell[k] == '1'){//有警铃
                std.bellFlag = true
              }
            })
          }
        })
        _this.setData({
          list_txl:list
        })
        //此时已获取到学生列表
        // if (res.data.errcode === '0') {
        //   _this.setData({
        //     list_txl: res.data.data
        //   })
        // } else {
        //   wx.showToast({
        //     icon: 'none',
        //     title: res.data.errmsg,
        //   })
        // }
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