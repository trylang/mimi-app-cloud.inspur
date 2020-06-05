<template>
  <div class="user-warp">
    <view class="user-action" :style="{background: user.bg}">
      <img v-if="auth=='notauth'" class="user-bg" :src="urls[0]" />
      <button v-if="auth=='notauth'" class="action-btn" @click="handleAction">登录/注册</button>
      <view v-if="auth!=='notauth'" style="position:relative;">
        <img class="userImg marg-b-20" :src="userImg" @click="showDialog" />
        <img class="user-anth" :src="user.auth" />
      </view>
      <!-- <text v-if="auth!=='notauth'">用户名</text> -->
    </view>

    <div class="info-list" @click="login">
      <view class="info-item" v-for="(item, index) in userInfos" :key="index" @click="go(index)">
        <view slot="icon" v-if="item.value===''">
          <i :class="['iconfont',item.icon]"></i>
        </view>
        <text class="value" v-else>{{item.value}}</text>

        <text class="text marg-t-15">{{item.label}}</text>
      </view>
    </div>
    <view class="action-list">
      <w-cell
        v-for="(item, index) in actionList"
        :key="index"
        @click="goDetails(item.details)"
        isLink
      >
        <view slot="icon">
          <i :class="['iconfont',item.icon]"></i>
        </view>
        <view slot="label">
          <text class="text marg-l-10">{{item.label}}</text>
        </view>
      </w-cell>
      <button open-type="share" id="share"></button>
      <button
        v-if="userInfo.nickName"
        open-type="contact"
        id="onlineCusSer"
        :session-from="sessionFrom"
        bindcontact="handleContact"
      ></button>
    </view>
    <w-dialog width="70%" :visible="showAuth" :maskClose="false">
      <view class="auth-dialog" hover-class="none" hover-stop-propagation="false">
        <img class="auth-img marg-b-20" :src="urls[1]" />
        <text class="remind marg-b-20">实名提醒</text>
        <text class="remind-desc marg-b-20">请尽快登录浪潮云官网进行实名认证</text>
        <w-icon @click="hideDialog" type="close" />
      </view>
    </w-dialog>
    <w-confirm id="wuss-confirm" />
  </div>
</template>

<script>
import { Confirm } from "wuss-weapp/dist";
import { environment } from "@/environments";
export default {
  config: {
    navigationBarBackgroundColor: "#0060B0",
    navigationBarTextStyle: "white",
    navigationBarTitleText: "浪潮云助手",
    enablePullDownRefresh: true
  },
  data() {
    return {
      userInfo: mpvue.getStorageSync("userInfo"),
      showAuth: false,
      isShowTell: false,
      tellList: [
        '售前：400-607-6657',
        '售后：400-619-2176（政府）',
        '售后：400-603-1123（企业）'
      ],
      urls: [
        `${environment.assets}/users/bg.png`,
        `${environment.assets}/users/auth.png`
      ],
      userImg: `${environment.assets}/images/head.svg`,
      userRealName: false,
      user: {
        bg: this.auth === "notauth" || !this.auth ? "" : "#0060B0",
        auth: this.userRealName
          ? `${environment.assets}/users/real_name.png`
          : `${environment.assets}/users/no_real_name.png`
      },
      userInfos: [
        {
          icon: "iconicon-over",
          value: "",
          label: "余额"
        },
        {
          icon: "iconicon-paid",
          value: "",
          label: "待支付"
        },
        {
          icon: "iconicon-coupon",
          value: "",
          label: "代金券"
        }
      ],

      actionList: [
        {
          icon: "iconicon-Messagedef",
          label: "消息中心",
          details: "/pages/user/infoCenter/infoCenter"
        },
        {
          icon: "icondef",
          label: "在线客服",
          desc: "快速1对1解答",
          details: "kefu"
        },
        {
          icon: "icondef2",
          label: "分享小程序",
          details: "share"
        },
        {
          icon: "iconicon-dhdef",
          label: "联系电话",
          desc: "7*24小时服务",
          details: "phone"
        },
        {
          icon: "icondef1",
          label: "设置",
          details: "setting"
        }
      ]
    };
  },
  computed: {
    auth() {
      return this.$store.state.userAuthStatus;
    },
    sessionFrom() {
      return `7moor|${this.userInfo.nickName}|${this.userInfo.avatarUrl}`;
    }
  },

  watch: {
    auth (n, m) {
      this.checkUserRealName()

      this.userAuthStatus = n
      if (n === 'cn-north-3') {
        this.initData()
      } else {
        if (n === "notauth") {
          this.userInfos[0].value = this.userInfos[1].value = this.userInfos[2].value =
            "";
        }
      }
      this.userImg =
        n === 'notauth' ? '' : `${environment.assets}/images/head.svg`
      this.user.bg = n === 'notauth' ? '' : '#0060B0'
    }
  },
  onShareAppMessage(obj) {
    return {
      title: "无处不在的计算",
      imageUrl: `${environment.assets}/images/share.png`,
      path: "/pages/home/index"
      // imageUrl:"../../static/images/share.png",
    };
  },
  onShow() {
    if (!this.userInfo) {
      this.userInfo = mpvue.getStorageSync("userInfo");
    }
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.initData();
    wx.stopPullDownRefresh();
  },
  methods: {
    initData() {
      this.$http.control.balance().then(res => {
        this.userInfos[0].value = res.result.totalBalance;
      });

      this.$http.control.payment().then(res => {
        this.userInfos[1].value = res.result.listSize;
      });
      this.$http.control.coupon().then(res => {
        this.userInfos[2].value = res.result.number;
      });
    },
    //跳转待支付页面
    go(n) {
      if (
        n === 1 &&
        this.auth === "cn-north-3" &&
        this.userInfos[1].value != ""
      ) {
        //跳转待支付页面
        this.$router.push({ path: "/pages/control/toBePaid/toBePaid" });
      } else if (
        n == 2 &&
        this.auth === "cn-north-3" &&
        this.userInfos[2].value != ""
      ) {
        //跳转优惠券页面
        this.$router.push({ path: "/pages/user/coupon/coupon" });
      }
    },

    // 未登录提示弹框登录
    login() {
      if (this.auth === "notauth") {
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
      }
    },

    showDialog() {
      if (this.auth && this.auth !== "notauth" && !this.userRealName) {
        this.showAuth = true;
      }
    },
    hideDialog() {
      this.showAuth = false;
    },
    goDetails(e) {
      if (e === "kefu") {
        if (!this.userInfo.nickName) {
          this.$router.push("/pages/user/entry/auth");
        }
      } else if (e === "share") {
        $("#share").trigger("click");
      } else if (e === "phone") {
        // if (/android/i.test(system.platform)) {
        //   this.tellList.push('取消')
        // }
        wx.showActionSheet({
          itemList: this.tellList,
          itemColor: "#333",
          success: res => {
            if (res.tapIndex === 0) {
              this.handleTell(this.tellList[0]);
            } else if (res.tapIndex === 1) {
              this.handleTell(this.tellList[1]);
            } else if (res.tapIndex === 2) {
              this.handleTell(this.tellList[2]);
            }
            // else{}
          }
        });
      } else if (e === "setting") {
        this.$router.push("/pages/user/setting");
      } else {
        if (this.auth === "cn-north-3") {
          this.$router.push({ path: e });
        } else {
          this.login();
        }
      }
    },
    handleAction() {
      this.$router.push({ path: "/pages/user/entry/account_login" });
    },
    handleContact(e) {
    },
    handleTell(text) {
      const item = text;
      const tell = item.replace(/[^0-9]/gi, "");
      wx.makePhoneCall({
        phoneNumber: tell, // 仅为示例，并非真实的电话号码
        success: () => {
          this.isShowTell = false;
        }
      });
    },
    checkUserRealName() {
      this.$http.user.checkUserRealName().then(res => {
        if (res.code == 0) {
          this.userRealName = res.result.authStatus
          this.user.auth = this.userRealName == 1
            ? `${environment.assets}/users/real_name.png`
            : `${environment.assets}/users/no_real_name.png`;
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/css/common.scss";
#share,
#onlineCusSer {
  position: absolute;
  background: none;
  border: none;
  outline: none;
  z-index: 1;
  top: 104px;
  left: 0;
  right: 0;
  height: 52px;
}
#onlineCusSer {
  top: 52px;
}
#share::after,
#onlineCusSer::after {
  border: none;
}
.iconfont {
  font-size: 20px;
  color: #666666;
}
.user-warp {
  text-align: center;
  background-color: #f2f2f2;

  .user-action {
    height: 256rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 30rpx;
    color: #fff;
    position: relative;
    .user-bg {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .action-btn {
      width: 200rpx;
      height: 64rpx;
      background: $primary-color;
      color: #fff;
      font-size: 26rpx;
      border-radius: 4px;
    }
    .userImg {
      width: 114rpx;
      height: 114rpx;
      border-radius: 50%;
    }
    .user-anth {
      position: absolute;
      right: 0;
      bottom: 10%;
      width: 36rpx;
      height: 36rpx;
    }
  }

  .info-list {
    height: 150rpx;
    background: #fff;
    box-sizing: border-box;
    padding: 0 57rpx;
    margin-bottom: 20rpx;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-around;
    .info-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 26rpx;
      width: 33.33%;
      color: $text-color;
      .value {
        color: $primary-text-color;
        font-size: 36rpx;
        font-weight: 500;
      }
    }
  }

  .action-list {
    background: #fff;
    position: relative;
  }

  .auth-dialog {
    width: 100%;
    height: 480rpx;
    // position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .auth-img {
      // position: absolute;
      // top: -50%;
      // left: 50%;
      width: 254rpx;
      height: 196rpx;
    }
    .remind {
      color: $text-color;
      font-size: 34rpx;
      font-weight: 600;
    }

    .remind-desc {
      color: $text-color;
      font-size: 26rpx;
    }

    .remind-btn {
      width: 360rpx;
      height: 72rpx;
      font-size: 26rpx;
      background: $primary-color;
      color: #fff;
    }
  }
}

.marg-t-15 {
  margin-top: 15rpx;
}
</style>

