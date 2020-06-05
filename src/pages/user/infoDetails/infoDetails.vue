<template>
  <div class="details">
    <h1>{{infoList.title}}</h1>
    <p>{{infoList.createdTime}}</p>
    <div class="con">
      <wxParse :content="infoList.content"/>
    </div>
  </div>
</template>
<script>
import wxParse from "mpvue-wxparse";
export default {
  components: {
    wxParse
  },
  config: {
    navigationBarTitleText: "详情"
  },
  onLoad: function(options) {
    //页面初始化 options为页面跳转所带来的参数
    this.index = options.index; //获取值
    this.allList = wx.getStorageSync("allList");
    this.infoList = this.allList[this.index];
    let content = this.infoList.content;
    if (
      content.indexOf("<html><head><title></title></head><body>") !== -1 &&
      content.lastIndexOf("</body></html>") !== -1
    ) {
      this.infoList.content = content
        .split("<html><head><title></title></head><body>")
        .join("");
      this.infoList.content = this.infoList.content
        .split("</body></html>")
        .join("");
    }
    this.para.ids.push(this.infoList.id);
    this.$http.control.read(this.para).then(res => {
    });
  },
  data() {
    return {
      index: "",
      params: {
        messageType: "all",
        start: 0,
        length: 10
      },
      allList: {},
      infoList: {},
      para: {
        ids: []
      },
      start: 0
    };
  },

  onReady: function() {},
  methods: {}
};
</script>

<style scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
.details {
  font-family: "微软雅黑";
  box-sizing: border-box;
  padding: 26rpx 30rpx;
}
.details h1 {
  font-size: 37rpx;
  font-weight: 700;
  color: rgba(0, 0, 0, 1);
  line-height: 52rpx;
}
.details p {
  font-size: 22rpx;
  color: rgba(153, 153, 153, 1);
  line-height: 30rpx;
  padding: 10rpx 0;
}
.details .con {
  font-size: 28rpx;
  color: rgba(53, 53, 53, 1);
  line-height: 44rpx;
}
</style>

