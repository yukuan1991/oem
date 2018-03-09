// pages/buyVip/buyVip.js
var config = require('../../config')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFlag: true,
    model: [
      {
        title: '月度',
        price: '0.01',
        unit:"月",
        type: 1,
        selectImage: true,
        selectedImageUrl:"../../images/xuanzhong_icon.png",
        unselectedImageUrl:"../../images/weixuanzhong_icon.png"
      },
      {
        title: '年度',
        price: '0.02',
        unit: "年",
        type: 2,
        selectImage: false,
        selectedImageUrl: "../../images/xuanzhong_icon.png",
        unselectedImageUrl: "../../images/weixuanzhong_icon.png"
      }
    ],
    payModel:[
      {
        title: '支付方式',
        unit: "微信",
        payImageUrl: "../../images/weixin.png",
      },
      {
        title: '会员特权',
        unit: "视频折扣",
        payImageUrl: "../../images/discount_icon.png",
      }
    ],
    number:"0.01",
    title: "月度",
    vipType: 1,
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
  selectClick(e){
    console.log(e)
    for (var i = 0; i < this.data.model.length; i++) {
      if (e.currentTarget.id == i) {
        this.data.model[i].selectImage = true;
        this.setData({
          vipType: this.data.model[i].type
        });
        console.log(this.data.vipType);
      }
      else {
        this.data.model[i].selectImage = false;
      }
    }
    this.setData({
      model: this.data.model,
      number: e.currentTarget.dataset.price,
      title: e.currentTarget.dataset.title,
    })
    
  },
  buyTap(){
    const price = this.data.number*100
    const body = this.data.title
    const url = config.service.vipPay
    console.log(url)
    app.request.requestPostApi(
      url, { userId: app.data.userId, body: "VIP购买", attach: "IE共学社", totalFee: price },
      this,
      this.vipPaySuccessFun,
      this.vipPayFailFun);
  },
  vipPaySuccessFun(res) {
    console.log(res);
    var that = this;
    if (res.status === "0"){
      var vipDetail = res.data
      wx.requestPayment({
        'appId': vipDetail.appId,
        'timeStamp': vipDetail.timeStamp,
        'nonceStr': vipDetail.nonceStr,
        'package': vipDetail.package,
        'signType': vipDetail.signType,
        'paySign': vipDetail.paySign,
        'success': function (res) {
          const addVipUrl = config.service.addVipUrl;
          app.request.requestPostApi(addVipUrl, { type: that.data.vipType, userId: app.data.userId }, that, that.addVipSuccess, that.addVipFail);
        },
        'fail': function (res) {
        }
      })
    }
  },
  vipPayFailFun(){

  },
  addVipSuccess(res) {
    console.log(res);
    wx.switchTab({
      url: '../mine/mine',
    });
  },
  addVipFail() {

  }
})