// pages/class/ydb.js
const app = getApp()
Page({
  // 已带班
  /**
   * 页面的初始数据
   */
  data: {
    list_ydb: [], //已带班级
    list_wdb: [], //未带班级
    isPopShow: false, //课程
    isPopShow2: false, //班级
    clickOverlayClose: true, //点击遮罩层关闭
    course_choosen: [], //已选
    course_unchoosen: [], //可选
    currentClassId: '', //当前选中班级id，操作课程时使用
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getbjlist_yd()
    this.getbjlist_wd()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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
  showCourse(e) { //打开右侧课程选择框
    let classid = e.currentTarget.dataset.id
    this.setData({
      currentClassId: classid  //当前classid
    })
    this.getCourseInfo() //获取已选课程
    this.getCourseInfo_unchoosen() //获取未选课程
    this.setData({
      isPopShow: true,
      currentClassId: classid  //当前classid
    })
  },
  onClose() {
    this.setData({
      isPopShow: false
    })
  },
  onClose2() {
    this.setData({
      isPopShow2: false
    })
  },
  showAdd() { //班级
    this.setData({
      isPopShow2: true
    })
  },
  getbjlist_yd() { //已带班级
    let _this = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: `${app.globalData.serverPath}/api/class/getClassListByUserId`,
      method: 'POST',
      header: app.getHeader2(),
      success(res) {
        console.log(res.data)
        wx.hideLoading()
        if (res.data.errcode === '0') {
          _this.setData({
            list_ydb: res.data.data,
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
  getbjlist_wd() { //可选班级列表
    let _this = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: `${app.globalData.serverPath}/api/class/getWbdClassByUserId`,
      method: 'POST',
      header: app.getHeader2(),
      success(res) {
        console.log(res.data)
        wx.hideLoading()
        if (res.data.errcode === '0') {
          _this.setData({
            list_wdb: res.data.data,
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
  add(e) { //增加班级
    console.log(e)
    let _this = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: `${app.globalData.serverPath}/api/class/addClassTeacher`,
      method: 'POST',
      header: app.getHeader2(),
      data: {
        classId: e.currentTarget.dataset.id
      },
      success(res) {
        console.log(res.data)
        wx.hideLoading()
        if (res.data.errcode === '0') {
          //添加班级成功后需要更新  已带班级和可选班级
          _this.getbjlist_yd()
          _this.getbjlist_wd()
          _this.setData({
            isPopShow2: false
          })
          wx.showToast({
            icon: 'none',
            title: res.data.errmsg,
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
  confirmDeleteClass(e) { //是否删除该班级
    let _this = this;
    wx.showModal({
      title: '提示',
      content: '您确定删除该班级吗？',
      showCancel: true,
      cancelColor: '#41B65A',
      confirmColor: '#41B65A',
      success: function(res) {
        if (res.confirm) {
          _this.deleteClass(e)
        }
      }
    })
  },
  deleteClass(e) { //移除班级
    let _this = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: `${app.globalData.serverPath}/api/class/removeClassTeacher`,
      method: 'POST',
      header: app.getHeader2(),
      data: {
        teacherClassId: e.currentTarget.dataset.id
      },
      success(res) {
        console.log(res.data)
        wx.hideLoading()
        if (res.data.errcode === '0') {
          //添加班级成功后需要更新  已带班级和可选班级
          _this.getbjlist_yd()
          _this.getbjlist_wd()
          wx.showToast({
            icon: 'none',
            title: res.data.errmsg,
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
  getCourseInfo() { //获取该班级，已选课程信息
    let _this = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: `${app.globalData.serverPath}/api/class/getYbdCourseByClassId`,
      method: 'POST',
      header: app.getHeader2(),
      data: {
        classId: _this.data.currentClassId
      },
      success(res) {
        console.log(res.data)
        wx.hideLoading()
        if (res.data.errcode === '0') {
          _this.setData({
            course_choosen: res.data.data
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
  getCourseInfo_unchoosen() { //获取该班级，可选课程信息
    let _this = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: `${app.globalData.serverPath}/api/class/getWbdCourseByClassId`,
      method: 'POST',
      header: app.getHeader2(),
      data: {
        classId: _this.data.currentClassId
      },
      success(res) {
        console.log(res.data)
        wx.hideLoading()
        if (res.data.errcode === '0') {
          _this.setData({
            course_unchoosen: res.data.data
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
  addCourse(e) { //增加课程
    let _this = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: `${app.globalData.serverPath}/api/class/addClassCourse`,
      method: 'POST',
      header: app.getHeader2(),
      data: {
        classId: _this.data.currentClassId,
        courseId: e.currentTarget.dataset.courseid
      },
      success(res) {
        console.log(res.data)
        wx.hideLoading()
        if (res.data.errcode === '0') { //增加成功后，刷新2种课程数据
          _this.getCourseInfo() //获取已选课程
          _this.getCourseInfo_unchoosen() //获取未选课程
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
  deleteCourse(e) { //增加课程
    let _this = this;
    if (e.currentTarget.dataset.status === '1') {
      wx.showLoading({
        title: '加载中...',
        mask: true
      })
      wx.request({
        url: `${app.globalData.serverPath}/api/class/removeClassCourse`,
        method: 'POST',
        header: app.getHeader2(),
        data: {
          classId: _this.data.currentClassId,
          courseId: e.currentTarget.dataset.courseid
        },
        success(res) {
          console.log(res.data)
          wx.hideLoading()
          if (res.data.errcode === '0') { //增加成功后，刷新2种课程数据
            _this.getCourseInfo() //获取已选课程
            _this.getCourseInfo_unchoosen() //获取未选课程
            wx.showToast({
              icon: 'none',
              title: res.data.errmsg,
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
    }
  }
})