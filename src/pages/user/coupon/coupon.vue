<template>
  <div>
    <div class="noData" v-if="isNoData">
      <i class="iconfont iconicon-Emptystate"></i>
      <p>您没有可用代金券</p>
      <navigator url="/pages/user/index" open-type="switchTab">
        <button type="default">返回</button>
      </navigator>
    </div>
    <div v-else>
      <div class="hasData">
        <div class="help" @click="call">如需帮助请联系：400-607-6657</div>
      </div>
      <div class="con">
        <div class="coupon">
          <img :src="coupon" alt />
          <div class="num">
            <div class="count">
              {{num}}
              <span>张</span>
            </div>
            <p>请尽快登录浪潮云官网使用</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { environment } from "@/environments";

export default {
  data() {
    return {
      num: "",
      isNoData: false,
      coupon: `${environment.assets}/images/coupon.svg`
    };
  },
  computed: {
    auth() {
      return this.$store.state.userAuthStatus;
    }
  },
  mounted() {
    if (this.auth === "cn-north-3") {
      this.$http.control.coupon().then(res => {
        this.num = res.result.number;
        if (this.num === 0) {
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
  }
};
</script>
<style scoped>
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
.con {
  min-height: 1500rpx;
  background: #302e35;
}
.coupon {
  width: 738rpx;
  height: 483rpx;
  text-align: center;
}
.coupon img {
  margin-left: 5%;
  position: relative;
}
.num {
  position: absolute;
  top: 15%;
  left: 35%;
}
.count {
  color: #f04149;
  font-size: 80rpx;
  font-weight: 600;
}
.count span {
  font-size: 34rpx;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.num p {
  font-size: 24rpx;
  font-weight: 400;
  color: rgba(127, 127, 127, 1);
  line-height: 33rpx;
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
.noData .iconfont {
  font-size: 103rpx;
  color: #ccc;
}
</style>

