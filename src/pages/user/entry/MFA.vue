<template>
  <div class="mfa-wrap">
    <input class="input" type="number" maxlength="6" placeholder="请输入MFA密码" @input="handleInput">
  </div>
</template>

<script>
export default {
  config: {
    navigationBarTitleText: "MFA登录"
  },
  data () {
    return {
      userName: "",
      password: ""
    }
  },
  onReady() {
    this.userName = this.$router.currentRoute.query.userName
    this.password = this.$router.currentRoute.query.password
    this.userName = decodeURIComponent(this.userName)
    this.password = decodeURIComponent(this.password)
  },
  methods: {
    reqMFA(code) {
      let params = {
        userName: this.userName,
        code
      };
      return this.$http.user.checkMFA(params);
    },
    reqToken() {},
    handleInput(e) {
      wx.hideToast()
      let value = e.target.value
      const reg = /[0-9]{6}/
      if (value.length === 6) {
        if (reg.test(value)) {
          this.reqMFA(value).then(res => {
            if (res.code && res.code === "0") {
              this.$keycloak
                .$getToken(this.userName, this.password)
                .then(() => {
                  this.$router.push({
                    path: "/pages/user/index",
                    isTab: true
                  })
                })
            } else {
              wx.showToast({
                icon: "none",
                title: "口令输入错误，请重新输入",
                duration: 3000
              })
            }
          })
        } else {
          wx.showToast({
            icon: "none",
            title: "口令必须为6位纯数字！",
            duration: 3000
          })
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mfa-wrap {
  height: 760rpx;
  position: relative;
  .input {
    width: 400rpx;
    height: 100rpx;
    padding-left: 30rpx;
    background: #ddd;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
}
</style>
