<script>
export default {
  // 公共UI组件放这里
  globalConfig: {
    usingComponents: {
      "w-button": "wuss-weapp/dist/w-button/index",
      "w-dialog": "wuss-weapp/dist/w-dialog/index",
      "w-popup": "wuss-weapp/dist/w-popup/index",
      "w-vcode": "wuss-weapp/dist/w-vcode/index",
      "w-cell": "wuss-weapp/dist/w-cell/index",
      "w-switch": "wuss-weapp/dist/w-switch/index",
      "w-pane": "wuss-weapp/dist/w-pane/index",
      "w-alert": "wuss-weapp/dist/w-alert/index",
      "w-icon": "wuss-weapp/dist/w-icon/index",
      "w-action-sheet": "wuss-weapp/dist/w-action-sheet/index",
      "w-confirm": "wuss-weapp/dist/w-confirm/index"
    }
  },
  created() {
    this.$keycloak.init();
    // 判断手机机型是否为iphone X系列
    this.checkIsIPhoneX();
  },
  onLaunch() {
    this.onNetworkStatusChange();
    // this.overShare();
  },
  methods: {
    onNetworkStatusChange() {
      wx.getNetworkType({
        success: function(res) {
          if (res.networkType == "none") {
            wx.showToast({
              icon: "none",
              title: "网络无法连接，请稍后再试",
              duration: 2000
            });
          }
        }
      });
      wx.onNetworkStatusChange(function(res) {
        if (res.isConnected) {
          wx.showToast({
            icon: "none",
            title: "网络无法连接，请稍后再试",
            duration: 2000
          });
        }
      });
    },
    //重写分享方法
    overShare () {
      //监听路由切换
      //间接实现全局设置分享内容
      wx.onAppRoute(function (res) {
        //获取加载的页面
        let pages = getCurrentPages(),
          //获取当前页面的对象
          view = pages[pages.length - 1],
          data;
        //console.log(pages)
        if (view) {
          data = view.data;
          console.log(view)
          if (data.isOverShare == undefined) {
            data.isOverShare = true;
            view.onShareAppMessage = function (obj) {
              //你的分享配置
              return {
                title:"无处不在的计算",
                imgUrl:`${environment.assets}/images/share.png`,
              };
            }
            console.log( view.onShareAppMessage)
          }
        }
      })
    },
    // onShareAppMessage(obj){
    //   return{
    //     title:"无处不在的计算",
    //     imgUrl:`${environment.assets}/images/share.png`,
    //   }
    //  },
    checkIsIPhoneX() {
      wx.getSystemInfo({
        success: res => {
          // 根据 model 进行判断
          if (res.model.search("iPhone X") != -1) {
            this.$store.dispatch("isIphoneX", true);
          }
          // 或者根据 screenHeight 进行判断
          // if (res.screenHeight == 812) {
          //   self.globalData.isIPX = true
          // }
        }
      });
    }
  }
};
</script>

<style>
page {
  /*border-top:1px solid #F6F6F6;*/
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  background: rgba(246, 246, 246, 1);
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
