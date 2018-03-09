var Session = require('../../vendor/wafer2-client-sdk/lib/session');
var app = getApp()
Page({
  data: {
    userInfo: {},
    takeSession: false,
    requestResult: '',
    vipFlag:false,
    normalList: [
      {
        url: "../allOrders/allOrders", image:"../../images/my_study_icon.png", title: "学习中心", explain:"全部订单"
      },
      {
        url: "../myFavor/myFavor", image: "../../images/my_collection_icon.png",title: "我的收藏"
      },
      {
        url: "../buyVip/buyVip?id=" + 1, image: "../../images/my_buy_icon.png", title: "VIP 购买"
      },
      {
        url: "../userSet/userSet", image: "../../images/my_account_icon.png", title: "账号设置"
      }
    ],
    time:null,
    nameFlag:"unvipname",
  },
  onLoad: function (options) {
    console.log("onLoad")
    options.data = "2017-11-14 到期"
    if (this.data.vipFlag){
      that.setData({
        vipList: [
          {
            url: "../allOrders/allOrders", title: "学习中心",explain: "全部订单"
          },
          {
            url: "../myFavor/myFavor", title: "我的收藏"
          },
          {
            url: "../buyVip/buyVip?id="+1, title: "我的会员", explain: options.data
          },
          {
            url: "../userSet/userSet", title: "账号设置"
          }
        ],
        nameFlag: "vipname",
      })
    }
    
  },
  onShow(){
    console.log("onshow")
    app.testSession(this.showUser)
  },
  showUser(){
    var session = Session.get();
    this.setData({
      userInfo: session.userinfo,
      logged: true
    })
  },
  // 用户登录示例
  login: function () {
    if (this.data.logged) return;
    app.login(this.successFirst)
  },
  successFirst(result){
    this.setData({
      userInfo: result,
      logged: true,
    })
  },
  success(result){
    this.setData({
      userInfo: result.data.data,
      logged: true,
    })
  },
})
