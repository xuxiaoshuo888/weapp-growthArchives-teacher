// pages/me/blacklist/blacklist.js
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
     blacklist:[]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
      let _this = this;
      //请求自己的黑名单数据
      wx.request({
        url: `${app.globalData.serverPath}/api/blacklist/getMyBlackList`,
        method: 'POST',
        data: { openId: app.globalData.openId },
        header: app.getHeader2(),
        dataType: 'json',
        success: function (res) {
          console.log(res.data);
          _this.setData({
              blacklist:res.data.data
          })
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

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  onRemove:function(e){
    let _this = this;
    let index = e.currentTarget.dataset.index;
    let item_id = this.data.blacklist[index].id;
    const { position, instance } = e.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        wx.showModal({
          title: '请确认',
          content: '您确定要将此学生移出黑名单么？',
          success:function(res){
            instance.close();
            if(res.cancel){
              return;
            }else{
              //成功的情况下进行接口调用
              console.log(e.currentTarget.dataset.index);
              wx.request({
                url: `${app.globalData.serverPath}/api/blacklist/removeMyBlackList`,
                method: 'POST',
                data: { id: item_id},
                header: app.getHeader2(),
                dataType: 'json',
                success: function (res) {
                  //修改页面数据
                  _this.data.blacklist.splice(index, 1)
                  _this.setData({
                    blacklist: _this.data.blacklist
                  });
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
        break;
    }
  }
})