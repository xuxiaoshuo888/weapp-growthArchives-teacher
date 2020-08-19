// pages/pl/pl.js
import * as echarts from '../../ec-canvas/echarts';

const app = getApp();
let chartRadar;

function biggest(array) {//改变Math.max的传参方式
  return Math.max.apply(Math, array);
}
function initChart(canvas, width, height, dpr) {
  chartRadar = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chartRadar);

  //初始化时使用静态数据，后面再调接口更新数据
  var option = {
    backgroundColor: "#ffffff",
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    radar: {
      shape: 'circle',
      radius: 40,
      indicator: [
      //   {
      //   name: '礼仪',
      //   max: 100
      // },
      // {
      //   name: '健体',
      //   max: 100
      // },
      // {
      //   name: '洁净',
      //   max: 100
      // },
      // {
      //   name: '乐学',
      //   max: 100
      // }
      ]
    },
    series: [{
      name: '得分',
      type: 'radar',
      data: [{
        value: [0, 0, 0, 0],
        name: '得分',
        areaStyle: {
          color: 'rgba(255, 0, 0, 1)'
      }
      }]
    }]
  }

  chartRadar.setOption(option);
  return chartRadar;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    xm: "",
    id: "",
    xn: '',
    xq: '',
    list: [],
    ec: {
      onInit: initChart
    },
    flag:false,//标识，false表示onshow的时候没有进行第一次拉取数据，true表示已经拉取过数据
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
    let id = wx.getStorageSync('chooseidlist')
    let xm = wx.getStorageSync('choosenamelist')
    let _this = this
    this.setData({
      xm: xm,
      id: id
    })
    if(!this.data.flag){//第一次更新数据
      setTimeout(function () {
        _this.getData()
        _this.setData({
          flag:true
        })
      }, 2000)
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //退出查看页面时需要清除id   的 list缓存
    wx.removeStorageSync('chooseidlist')
    wx.removeStorageSync('choosenamelist')
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
  getData: function () {
    let _this = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.request({
      url: `${app.globalData.serverPath}/api/archives/getListByWx`,
      method: 'POST',
      data: {
        studentId: _this.data.id,
        timeRange: 'xq'
      },
      header: app.getHeader2(),
      success(res) {
        console.log(res.data)
        wx.hideLoading()
        if (res.data.errcode === '0') {
          _this.setData({
            list: res.data.data.list,
            xn: res.data.data.xn,
            xq: res.data.data.xq,
          })
          console.log(chartRadar)
          _this.processList(res.data.data.list);//处理数据格式，更新雷达图数据
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
  calc(scope) {
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
      } else if (50 > (scope % 250) > 10) {
        kuayues = parseInt(((scope % 250) % 50) / 10);
      }
    } else if (250 > scope >= 50) { //总分在50~250之间
      chaoyues = parseInt(scope / 50);
      if ((scope % 50) >= 10) {
        kuayues = parseInt((scope % 50) / 10);
      }
    } else if (50 > scope >= 10) { //总分在10~50之间
      kuayues = parseInt(scope / 10);
    }
    let d = {
      kuayues: kuayues,
      chaoyues: chaoyues,
      zhuoyues: zhuoyues,
      jiangzhangs: jiangzhangs
    }
    console.log(d)
    return d
  },
  processList(list) {//处理数据，使其符合echarts雷达图的数据格式
    console.log(chartRadar)
    let indicator_data = [];//维度
    let series_data = [];//各个维度的分数
    let v = []
    let max;//雷达图的吗，每个维度数值的上限
    //处理series_data
    list.forEach((item) => {
      v.push(item.zf)
    })
    series_data.push({
      value: v,
      name: '得分',
      areaStyle: {
        color: 'rgba(250,0,0,0.5)'
      }
    })
    if (biggest(v) <= 20) {//20以内以20为上限
      max = 20
    } else {
      max = biggest(v)
    }

    //处理indicator_data
    list.forEach((item) => {
      if (item.name != '警铃') {
        indicator_data.push({
          name: item.name + '\n' + item.zf,
          max: max
        })

      }
    })

    console.log(indicator_data)
    console.log(series_data)

    chartRadar.setOption({
      radar: {
        // shape: 'circle',
        indicator: indicator_data
      },
      series: [{
        data: series_data
      }]
    })
  }
})