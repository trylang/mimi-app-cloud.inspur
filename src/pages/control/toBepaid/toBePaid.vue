<template>
  <div class="all">
    <div class="noData" v-if="isNoData">
      <i class="iconfont iconicon-Emptystate"></i>
      <p>您没有待支付订单</p>
      <navigator url="/pages/control/index" open-type="switchTab" v-if="isControl">
        <button type="default">返回</button>
      </navigator>
      <navigator url="/pages/user/index" open-type="switchTab" v-if="isUser">
        <button type="default">返回</button>
      </navigator>
    </div>
    <div v-else>
      <div class="hasData">
        <div class="help" @click="call">如需帮助请联系：400-607-6657</div>
      </div>
      <div class="allList">
        <div class="list" v-for="(item,index) in orderList" :key="index">
          <p>您有待支付订单{{item.orderId}}，请尽快登录https://cloud.inspur.com/处理。</p>
          <span>{{item.createTime}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  config: {
    navigationBarTitleText: "待支付"
  },
  data() {
    return {
      orderList: [],
      isNoData: false,
      isUser: null,
      isControl: null
    };
  },
  onLoad: function(options) {
    let pages = getCurrentPages();
    let prevpage = pages[pages.length - 2];
    if (prevpage.route === "pages/user/index") {
      this.isUser = true;
      this.isControl = false;
    } else if (prevpage.route === "pages/control/index") {
      this.isUser = false;
      this.isControl = true;
    }
  },
  computed: {
    auth() {
      return this.$store.state.userAuthStatus;
    }
  },
  mounted() {
    if (this.auth === "cn-north-3") {
      this.$http.control.payment().then(res => {
        this.orderList = res.result.orderList;
        if (this.orderList.length === 0) {
          this.isNoData = true;
        } else {
          this.isNoData = false;
        }
      });
    }
  },
  methods: {
    call() {
      wx.makePhoneCall({
        phoneNumber: "4006076657"
      });
    }
    // 格式化日期
    // hasDate(date) {
    //   var d, Y, M, D;
    //   d = new Date(date);
    //   Y = d.getFullYear();
    //   M = d.getMonth() + 1;
    //   D = d.getDate();
    //   if (M < 10) {
    //     M = "0" + M;
    //   }
    //   if (D < 10) {
    //     D = "0" + D;
    //   }
    //   return Y + "-" + M + "-" + D;
    // },
  }
};
</script>
<style scoped>
page {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  background: rgba(246, 246, 246, 1);
}
.all {
  /* position: relative; */
  width: 100%;
  height: 100%;
  background: rgba(246, 246, 246, 1);
}
.noData .iconfont {
  font-size: 103rpx;
  color: #ccc;
}
.allList {
  padding: 0 30rpx;
  box-sizing: border-box;
}
.noData {
  width: 300rpx;
  height: 300rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -150rpx;
  margin-left: -150rpx;
  text-align: center;
}
.noData img {
  width: 107rpx;
  height: 91rpx;
}
.noData p {
  color: #666;
  font-size: 28rpx;
  margin: 37rpx 0;
}
.help {
  height: 80rpx;
  background: linear-gradient(
    180deg,
    rgba(251, 243, 219, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  color: #fa6400;
  font-size: 28rpx;
  box-sizing: border-box;
  padding: 18rpx 0 0 30rpx;
}
.list {
  background-color: #fff;
  margin-top: 30rpx;
  color: #333;
  font-size: 30rpx;
  box-sizing: border-box;
  padding: 18rpx 24rpx;
}
.list span {
  color: #7f7f7f;
  font-size: 24rpx;
  display: inline-block;
  margin-top: 26rpx;
}
</style>

