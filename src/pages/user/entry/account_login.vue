<template>
  <div class="login-wrap">
    <view class="img-wrap">
      <img class="logo marg-b-10" :src="logoImg" alt />
      <text>无处不在的计算</text>
    </view>
    <view class="action-wrap">
      <view>
        <view class="item-wrap" :style="{borderBottomColor: message.name? '#FA553D': 'D9D9D9'}">
          <i class="iconfont iconicon-Username icon"></i>
          <input
            v-model="formData.name"
            placeholder="用户名或电子邮箱"
            maxlength="64"
            @blur="check('name')"
          >
        </view>
        <text :class="['message', message.name?'message-show':'message-hide']">{{message.name}}</text>

        <view class="item-wrap" :style="{borderBottomColor: message.password? '#FA553D': 'D9D9D9'}">
          <i class="iconfont iconicon-Password icon"></i>
          <input
            v-model="formData.password"
            v-if="passType == 'password'"
            style="width:100%;"
            type="password"
            maxlength="16"
            placeholder="密码"
            @blur="check('password')"
          >
          <input v-model="formData.password" style="width:100%;" v-if="passType == 'text'" type="text" placeholder-class="placeholder-class"
                 placeholder="密码" maxlength="16" @blur="check('password')"/>
          <i class="iconfont iconicon-Password-invisible icon" @click="showPass"></i>
        </view>
        <text
          :class="['message', message.password?'message-show':'message-hide']"
        >{{message.password}}</text>
      </view>

      <view class="action">
        <button
          class="btn"
          :disabled="loginLoading | !ifContinue"
          :loading="loginLoading"
          :style="{background: (ifContinue & !loginLoading) ? '#0062AC' : ''}"
          @click="handleLogin()"
        >登录</button>
        <view class="action-link">
          <!-- <a href="/pages/user/entry/register">忘记密码</a> -->
          <a href="/pages/user/entry/register">立即注册</a>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
import { environment } from '@/environments'
export default {
  config: {
    navigationBarTitleText: '浪潮云登录'
  },
  data () {
    return {
      formData: { name: '', password: '' },
      message: { name: '', password: '' },
      passType:"password",
      loginLoading: false,
      logoImg: `${environment.assets}/users/logo.svg`,
      
      failLogin: new Map()
    }
  },
  computed: {
    ifContinue () {
      const ary = []
      for (let key in this.formData) {
        ary.push(this.simplecheck(key))
      }
      const length = ary.filter(item => item === true).length
      return length === 2
    }
  },
  methods: {
    handleLogin () {
      this.message.name = ''
      this.message.password = ''
      this.loginLoading = true
      if (this.failLogin.has(this.formData.name) && this.failLogin.get(this.formData.name)['times'] >= 5) { // 连续输入 5 次禁止重试
        if (new Date().getTime() - this.failLogin.get(this.formData.name)['time'].getTime() >= 5 * 1000 * 60) { // 超过 5 min 允许重试
          this.failLogin.get(this.formData.name)['times'] = 4
          this.failLogin.get(this.formData.name)['time'] = new Date()
        } else { // 密码连续输错 5 次， 且距上次输错密码不到 5 min
          this.message.name = '账户被暂时锁定，请5分钟后再试'
          this.loginLoading = false
          return
        }
      }
      if (this.ifContinue) {
        let params = {
          userName: this.formData.name,
          password: this.formData.password
        }
        this.$http.user
          .login(params)
          .then(res => {
            if (res.code === '0') {
              if (res.result === false) {
                this.$keycloak
                  .$getToken(this.formData.name, this.formData.password)
                  .then(next => {
                    this.failLogin.delete(this.formData.name)
                    this.formData.name = ''
                    this.formData.password = ''
                    this.$router.push({
                      path: '/pages/user/index',
                      isTab: true
                    })
                  })
              } else if (res && res.result === true) { // MFA
                this.$router.push({ path: 'MFA',
                  query:
                {userName: encodeURIComponent(this.formData.name), password: encodeURIComponent(this.formData.password)}
                })
              } else {
                if (this.failLogin.has(this.formData.name)) {
                  let time = this.failLogin.get(this.formData.name)['time']
                  let times = this.failLogin.get(this.formData.name)['times']
                  this.failLogin.set(this.formData.name, {times: times + 1, time})
                } else {
                  this.failLogin.set(this.formData.name, {times: 1, time: new Date()})
                }
                this.message.name = '用户名或密码错误'
                this.message.password = '用户名或密码错误'
              }
            } else if (res.code === '401') {
              if (this.failLogin.has(this.formData.name)) {
                let time = this.failLogin.get(this.formData.name)['time']
                let times = this.failLogin.get(this.formData.name)['times']
                this.failLogin.set(this.formData.name, {times: times + 1, time})
              } else {
                this.failLogin.set(this.formData.name, {times: 1, time: new Date()})
              }
              this.message.password = '密码错误'
            } else if (res.code === '403') {
              if (this.failLogin.has(this.formData.name)) {
                let time = this.failLogin.get(this.formData.name)['time']
                let times = this.failLogin.get(this.formData.name)['times']
                this.failLogin.set(this.formData.name, {times: times + 1, time})
              } else {
                this.failLogin.set(this.formData.name, {times: 1, time: new Date()})
              }
              this.message.name = '暂不支持华北二账号登录'
            } else {
              if (this.failLogin.has(this.formData.name)) {
                let time = this.failLogin.get(this.formData.name)['time']
                let times = this.failLogin.get(this.formData.name)['times']
                this.failLogin.set(this.formData.name, {times: times + 1, time})
              } else {
                this.failLogin.set(this.formData.name, {times: 1, time: new Date()})
              }
              this.message.name = '用户名或密码错误'
              this.message.password = '用户名或密码错误'
            }
            this.loginLoading = false
          })
          .catch(error => {
            if (
              error.status &&
              error.status === 500 &&
              error.response.data.code &&
              error.response.data.code === '003.010004'
            ) {
              if (this.failLogin.has(this.formData.name)) {
                let time = this.failLogin.get(this.formData.name)['time']
                let times = this.failLogin.get(this.formData.name)['times']
                this.failLogin.set(this.formData.name, {times: times + 1, time})
              } else {
                this.failLogin.set(this.formData.name, {times: 1, time: new Date()})
              }
              this.message.name = '此账号不存在'
            } else {
              if (this.failLogin.has(this.formData.name)) {
                let time = this.failLogin.get(this.formData.name)['time']
                let times = this.failLogin.get(this.formData.name)['times']
                this.failLogin.set(this.formData.name, {times: times + 1, time})
              } else {
                this.failLogin.set(this.formData.name, {times: 1, time: new Date()})
              }
              this.message.name = '用户名或密码错误'
              this.message.password = '用户名或密码错误'
            }
            this.loginLoading = false
          })
          .finally(() => {
            this.loginLoading = false
          })
      }
    },
    simplecheck (type) {
      if (!this.formData[type]) {
        return false
      }
      return true
    },
    check (type) {
      this.message[type] = ''
      if (!this.formData[type]) {
        this.message[type] =
          type === 'name' ? '用户名或电子邮箱不能为空' : '密码不能为空'
        return false
      } else {
        this.message[type] = ''
        return true
      }
    },
    showPass(){
      if(this.passType == "password")
        this.passType = "text";
      else this.passType = "password";
    }
  }
}
</script>

<style lang="scss">
@import "@/css/common.scss";

.login-wrap {
  padding: 60rpx;
  background: #fff;
  height: 100%;
  @extend .vertical;
  .img-wrap {
    @extend .vertical;
    color: #7f7f7f;
    font-size: 24rpx;
    letter-spacing: 22rpx;
    .logo {
      height: 60rpx;
    }
  }

  .action-wrap {
    width: 100%;
    margin-top: 50px;
    .item-wrap {
      padding: 22rpx 0 22rpx 0;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #d9d9d9;
      .icon {
        margin-right: 24rpx;
        color: #ccc;
      }
      input{
        font-size:17px;
        line-height:24px;
        height:24px;
        min-height:24px;
      }
    }
  }

  .action {
    margin-top: 50rpx;
    .btn {
      height: 96rpx;
      color: #fff;
      font-size: 36rpx;
      background: #d9d9d9;
    }
    .btn:after{
      border:none;
      outline:none;
    }
    .action-link {
      margin-top: 20rpx;
      display: flex;
      justify-content: space-between;
      @extend .link;
    }
  }
}

.placeholder-class {
  color: #ccc;
  font-size: 34rpx;
}

.message {
  transition: 0.5s;
  margin-top: 10rpx 0 0 60rpx;
  color: $error-color;
  font-size: 24rpx;
  opacity: 0;
}
.message-show {
  opacity: 1;
}
.message-hide {
  opacity: 0;
}
</style>
