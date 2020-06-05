<template>
  <div>
    <div class="header" v-if="noLogin" @click="login">
      <div class="header_con">
        <i class="iconfont iconfont1 iconicon-over"></i>
        <span>余额</span>
      </div>
      <div class="header_con">
        <i class="iconfont iconfont1 iconicon-paid"></i>
        <span>待支付</span>
      </div>
      <div class="header_con">
        <i class="iconfont iconfont1 iconicon-coupon"></i>
        <span>工单</span>
      </div>
    </div>
    <div class="header" v-else>
      <div class="header_con">
        <p>{{ balance }}</p>
        <span>余额</span>
      </div>
      <div class="header_con" @click="toBePaid()">
        <p>{{ payment }}</p>
        <span>待支付</span>
      </div>
      <div class="header_con" @click="workOrder()">
        <p>{{ order }}</p>
        <span>工单</span>
      </div>
    </div>
    <div class="content">
      <navigator class="login" url="/pages/user/entry/account_login" v-if="noLogin">
        <div class="login_detail">
          <i>
            <img :src="profile" alt />
          </i>
          <span>登录浪潮云助手</span>
        </div>
        <div class="arrow">
          <i class="iconfont iconiconrightarrowgraydef"></i>
        </div>
      </navigator>
      <view class="login" open-type="switchTab" v-else @click="goUser">
        <div class="login_detail">
          <i>
            <img :src="head" alt />
          </i>
          <span>{{userName}}</span>
        </div>
        <div class="arrow">
          <i class="iconfont iconiconrightarrowgraydef"></i>
        </div>
      </view>
      <div class="product">
        <ProList></ProList>
      </div>
    </div>
    <w-confirm id="wuss-confirm" />
  </div>
</template>

<script>
import { formatTime } from "@/utils/index";
import card from "@/components/card";
import ProList from "@/components/proList";
import { Confirm } from "wuss-weapp/dist";
import { environment } from "@/environments";

export default {
  config: {
    navigationBarTitleText: "控制台",
    navigationBarBackgroundColor: "#0062ac",
    navigationBarTextStyle: "white",
    enablePullDownRefresh: true
  },

  components: {
    card,
    ProList
  },
  computed: {
    auth() {
      return this.$store.state.userAuthStatus;
    }
  },
  data() {
    return {
      balance: "",
      payment: "",
      order: "",
      logs: [],
      noLogin: true, //未登录状态
      userName: "",
      head: `${environment.assets}/images/head.svg`,
      profile: `${environment.assets}/images/profile.png`
    };
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.initData();
    wx.stopPullDownRefresh();
  },
  onShareAppMessage(obj) {
    return {
      title: "无处不在的计算",
      imageUrl: `${environment.assets}/images/share.png`,
      path: "/pages/home/index"
      // imageUrl:"../../static/images/share.png",
    };
  },
  methods: {
    login() {
      Confirm({
        title: "",
        content: "请登录后操作",
        cancelText: "取消",
        confirmText: "登录",
        cancelTextColor: "#999999",
        confirmTextColor: "#1777E6",
        confirm: () => {
          this.$router.push(`/pages/user/entry/account_login`);
        }
      });
    },

    initData() {
      this.$http.control.balance().then(res => {
        this.balance = res.result.totalBalance;
      });

      this.$http.control.payment().then(res => {
        this.payment = res.result.listSize;
      });
      this.$http.control.order().then(res => {
        // 返回数字，转成字符串
        this.order = res.result + "";
      });
    },
    toBePaid() {
      if (this.payment) {
        this.$router.push({ path: "/pages/control/toBePaid/toBePaid" });
      }
    },
    workOrder() {
      if (this.order) {
        this.$router.push({ path: "/pages/control/workOrder/workOrder" });
      }
    },
    goUser() {
      wx.switchTab({
        url: "/pages/user/index"
      });
    }
  },
  watch: {
    auth(n, m) {
      // debugger;
      if (n === "cn-north-3") {
        this.noLogin = false;
        this.userName = this.$store.getters.getUserInfo.userName;
        this.initData();
      } else {
        this.noLogin = true;
      }
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-around;
  height: 207rpx;
  padding: 50rpx 37rpx 44rpx;
  box-sizing: border-box;
  background-color: #0062ac;
}
.header_con {
  width: 33.33%;
  text-align: center;
}
.header_con p {
  margin-bottom: 21rpx;
  color: #fff;
  font-size: 36rpx;
}
.header_con span {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.4);
}
.content {
  background: #f6f6f6;
  height: 100%;
  padding-top: 18rpx;
}
.login {
  display: flex;
  background: #fff;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 24rpx 33rpx 34rpx 33rpx;
  margin-bottom: 18rpx;
}
.login_detail i {
  display: inline-block;
  width: 64rpx;
  height: 64rpx;
  margin-right: 18rpx;
}
.login_detail i img {
  width: 64rpx;
  height: 64rpx;
  vertical-align: middle;
}
.login_detail span {
  color: #333333;
  font-family: "微软雅黑";
  font-size: 32rpx;
}

.iconfont {
  /*margin-top: 14rpx;*/
  font-size: 34rpx;
  color: "#D1D1D6";
}
.product {
  display: flex;
  background-color: #fff;
  flex-wrap: wrap;
}
.module {
  width: 33.33%;
  height: 226rpx;
  box-sizing: border-box;
  padding: 54rpx 38rpx 45rpx 38rpx;
  text-align: center;
  border-bottom: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
}
.module div {
  width: 60rpx;
  margin-bottom: 32rpx;
  height: 60rpx;
  margin-left: 35%;
}
.module:nth-child(3n) {
  border-right: none;
}
.module div img {
  width: 60rpx;
  height: 60rpx;
}
.module span {
  font-size: 28rpx;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.iconfont1 {
  font-size: 44rpx;
  margin-bottom:19rpx;
  color: #fff;
}
</style>
