// components/searchCom/searchCom.js
Component({
  properties: {
    modalHidden: {
      type: Boolean,
      value: true
    }, //这里定义了modalHidden属性，属性值可以在组件使用时指定.写法为modal-hidden  
    searchList: {
      type: Array,
      value: [],
    },
    inputShowed: {
      type: Boolean,
      value: false
    }
  },
  data: {
    inputVal: "",
  },
  methods: {
    hideSearch: function () {
      this.setData({
        inputVal: "",
        modalHidden: true
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
    searchClick() {
    }
  }
});