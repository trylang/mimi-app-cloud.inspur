<template>
  <div class="all">
    <div class="noData" v-if="isNoData">
      <i class="iconfont iconicon-Emptystate"></i>
      <p>您没有待处理工单</p>
      <navigator url="/pages/control/index" open-type="switchTab">
        <button type="default">返回</button>
      </navigator>
    </div>
    <div v-else>
      <div class="hasData">
        <div class="help" @click="call">如需帮助请联系：400-607-6657</div>
      </div>
      <div class="allList">
        <div class="list">
          <p>您有{{num}}条工单待处理，请尽快登录https://cloud.inspur.com/处理。</p>
          <span>{{time}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  config: {
    navigationBarTitleText: "工单"
  },
  data() {
    return {
      num: "",
      time: "",
      isNoData: false
    };
  },
  computed: {
    auth() {
      return this.$store.state.userAuthStatus;
    }
  },

  mounted() {
    var d, Y, M, D;
    d = new Date();
    Y = d.getFullYear();
    M = d.getMonth() + 1;
    D = d.getDate();
    if (M < 10) {
      M = "0" + M;
    }
    if (D < 10) {
      D = "0" + D;
    }
    this.time = Y + "-" + M + "-" + D;
    if (this.auth === "cn-north-3") {
      this.$http.control.order().then(res => {
        this.num = res.result;
        if (this.num > 0) {
          this.isNoData = false;
        } else {
          this.isNoData = true;
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
.noData .iconfont {
  font-size: 103rpx;
  color: #ccc;
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

