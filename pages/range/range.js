// pages/range/range.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dimensionalityId: '-1', //维度，-1全部，1礼仪，2健体，3洁净，4乐学
    weiduList: [], //维度list
    typeList: ['本周', '本月', '本学期'], //时间：week,month,term,year
    typeListIndex: 0,
    njList: [],
    njIndex: 0,
    bjList: [],
    bjIndex: 0,
    pageNum: 1,
    pageSize: 400, //先改成400，后期改回100另外加入滚动功能
    list: [], //展示的list
    isInit: true,
    F:false
  },
  onChange(e) { //选择维度
    this.setData({
      dimensionalityId: e.detail.name
    })
    this.getData()
  },
  chooseTime() { //选择时间区间
    let _this = this;
    wx.showActionSheet({
      itemList: _this.data.typeList,
      success: function(res) {
        console.log(res.tapIndex);
        _this.setData({
          typeListIndex: res.tapIndex
        })
        _this.getData()
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  choosenj(e) { //选择年级之后马上刷新班级列表，并更新数据
    this.setData({
      njIndex: e.detail.value
    })
    this.getbjlist()
  },
  choosebj(e) {
    this.setData({
      bjIndex: e.detail.value
    })
    this.getData()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //取txl页面缓存的weiduList
    let weiduList = wx.getStorageSync('weiduList')
    this.setData({
      weiduList: weiduList,
    })
    this.getnjlist(); //拿年级列表

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
    //初始化时，onshow这里不执行获取数据，
    if (!this.data.isInit) { //非初始化
      this.getData() //拿list
    }
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

  getData: function() { //拿列表
    let _this = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    let type = ''
    if (this.data.typeListIndex == 0) {
      type = 'week'
    } else if (this.data.typeListIndex == 1) {
      type = 'month'
    } else if (this.data.typeListIndex == 2) {
      type = 'term'
    }
    let classId = '';
    let year = '';

    //当年级选项不是全校时，有具体年级，那么展示班级选项
    if (this.data.bjList[this.data.bjIndex]) {
      classId = this.data.bjList[this.data.bjIndex].id || ''
    }
    //当选择全校时，班级id设置为空，班级选项不可选择,不可见
    if (this.data.njList[this.data.njIndex]) {
      year = this.data.njList[this.data.njIndex].year || ''
      if (year === '') {
        classId = ''
      }
    }

    wx.request({
      url: `${app.globalData.serverPath}/api/archives/getRankByWx`,
      method: 'POST',
      data: {
        pageNum: _this.data.pageNum,
        pageSize: _this.data.pageSize,
        type: type, //时间类型
        dimensionalityId: _this.data.dimensionalityId, //维度
        year: year,
        classId: classId
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

          //处理list
          // let list = res.data.data.rows;
          // console.log(list)
          // list.forEach((item) => {
          //   let m = _this.calc(item.growths)
          //   item.kuayues = m.kuayues;
          //   item.chaoyues = m.chaoyues;
          //   item.zhuoyues = m.zhuoyues;
          //   item.jiangzhangs = m.jiangzhangs;
          // })
          // _this.setData({
          //   list: list
          // })

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
  getnjlist: function() { //拿年级列表
    let _this = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: `${app.globalData.serverPath}/api/archives/getNjList`,
      method: 'POST',
      header: app.getHeader2(),
      success(res) {
        console.log(res.data)
        wx.hideLoading()
        if (res.data.errcode === '0') {
          //取到值以后先加入一个全校的虚拟年级
          res.data.data.unshift({year:'',nj:"全校"})
          _this.setData({
            njList: res.data.data,
          })
          _this.getbjlist(); //拿班级列表
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
  getbjlist: function() { //拿班级列表
    let _this = this;
    let y = this.data.njList[this.data.njIndex].year || '';
    // console.log(y)
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: `${app.globalData.serverPath}/api/archives/getClassInfoList`,
      method: 'POST',
      data: {
        year: y
      },
      header: app.getHeader2(),
      success(res) {
        console.log(res.data)
        wx.hideLoading()
        if (res.data.errcode === '0') {
          //加入一个虚拟的'所有班'
          res.data.data.unshift({id:'',class_name:"所有班"});
        
          _this.setData({
            //班级默认选择第一个
            bjIndex:0,
            bjList: res.data.data,
          })
          _this.getData()
          _this.setData({
            isInit: false
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
  calc(scope1) {
    //例如 638   250*2  +  50*2 + 10*3 + 8
    let scope = Number(scope1)
    const kuayue = 10;
    const chaoyue = 50;
    const zhuoyue = 250;

    let jiangzhangs = ((scope % 250) % 50) % 10;
    let kuayues = 0;
    let chaoyues = 0;
    let zhuoyues = 0;
    if (scope >= 250) { //总分高于250
      zhuoyues = parseInt(scope / 250);
      if ((scope % 250) >= 50) {
        chaoyues = parseInt((scope % 250) / 50);
        kuayues = parseInt(((scope % 250) % 50) / 10);
        // jiangzhangs = ((scope % 250) % 50) % 10
      } else if (50 > (scope % 250) > 10) {
        kuayues = parseInt(((scope % 250) % 50) / 10);
        // jiangzhangs = (scope % 250) % 10
      }
    } else if (250 > scope >= 50) { //总分在50~250之间
      chaoyues = parseInt(scope / 50);
      if ((scope % 50) >= 10) {
        kuayues = parseInt((scope % 50) / 10);
      }
      // jiangzhangs = (scope % 50) % 10
    } else if (50 > scope >= 10) { //总分在10~50之间
      console.log(scope)
      console.log(parseInt(scope / 10))
      kuayues = parseInt(scope / 10);
      // jiangzhangs = scope % 10
    } else if (scope < 10) {
      // jiangzhangs = scope
    }
    let d = {
      kuayues: kuayues,
      chaoyues: chaoyues,
      zhuoyues: zhuoyues,
      jiangzhangs: jiangzhangs
    }
    // console.log(d)
    return d
  },
  toPj(e) {
    let id = [];
    let name = [];
    id.push(e.currentTarget.dataset.id);
    name.push(e.currentTarget.dataset.name);
    wx.setStorageSync('chooseidlist', id) //存id数组
    wx.setStorageSync('choosenamelist', name) //存姓名数组
    wx.navigateTo({
      url: `/pages/pl/pl`,
    })
  }
})