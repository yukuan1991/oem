var config = require('../../config')
Page({
  data: {
    is_modal_Hidden: true,
    searchList: ["价值工程", "质量工程", "项目管理", "管理工程", "供应链管理", "人因工程", "运筹学", "工作设计", "金融工程", "设施管理"],
    inputShowed: false,
    flag: true,
    modalFlag: true,
    inputShowed: false,
    inputVal: "",
    courseArr: [],
    courseDir: [],
    pageIsEmpty: false,
    tipMsg: "您访问的页面为空···"
  },
  onLoad: function (option) {
    console.log(option);
    wx.setNavigationBarTitle({
      title: option.title,
    });
    var _this = this;
    wx.request({
      url: config.service.courseListUrl,
      method: 'POST',
      data: {
        type: option.type,
        id: option.id
      },
      success: function(res) {
        console.log(res.data);
        if(res.data.data <=0) {
          _this.setData(
            {
              pageIsEmpty: true
            }
          )
        } else {
          _this.setData(
            {
              courseArr: res.data.data,
              pageIsEmpty: false
            }
          )

        }
      }
    })

    wx.request({
      url: config.service.courseUrl,
      success: function (res) {
        console.log(res.data);
        _this.setData(
          {
            courseDir: res.data.data
          }
        )
      }
    });

    if (option.title === "全部课程") {
      this.setData({
        title: option.title,
        courseCategory: "全部"
      });
    } else {
      this.setData({
        title: option.title,
        courseCategory: option.title
      });
    }
  },
  tapCourseCategory: function () {
    this.setData({
      flag: false,
      modalFlag: false
    })
  },
  tapModal: function () {
    console.log("tapModal");
    var _this = this;
    setTimeout(() => {
      _this.setData({
        modalFlag: true,
      })
    }, 400);
    _this.setData({
      flag: true,
    });
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  showSearch() {
    this.setData({
      is_modal_Hidden: false,
      inputShowed: true

    })
  }
})