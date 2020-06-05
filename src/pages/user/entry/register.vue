<template>
  <div class="register-wrap">
    <!-- <view class="title-wrap">
      <text>欢迎注册浪潮云</text>
    </view> -->
    <view class="action-wrap">
      <!-- 用户名 -->
      <view class="item-wrap" :style="{borderBottomColor: message.name? '#FA553D': 'D9D9D9'}">
        <i class="iconfont iconicon-Username icon"></i>
        <input v-model="formData.name" style="width:100%;" placeholder-class="placeholder-class" placeholder="请输入您的用户名" 
        maxlength="32" @blur="check('name')"/>
        <i class="iconfont iconicon-fail icon" @click="clearUsername"></i>
      </view>
      <text :class="['message', message.name?'message-show':'message-hide']">{{message.name}}</text>

      <view class="item-wrap" :style="{borderBottomColor: message.password? '#FA553D': 'D9D9D9'}">
        <i class="iconfont iconicon-Password icon"></i>
        <input v-model="formData.password" style="width:100%;" v-if="passType == 'password'" type="password" placeholder-class="placeholder-class"
        placeholder="密码" maxlength="16" @blur="check('password')"/>
        <input v-model="formData.password" style="width:100%;" v-if="passType == 'text'" type="text" placeholder-class="placeholder-class"
               placeholder="密码" maxlength="16" @blur="check('password')"/>
        <i class="iconfont iconicon-Password-invisible icon" @click="showPass"></i>
      </view>
      <text :class="['message', message.password?'message-show':'message-hide']">{{message.password}}</text>
      
      <view class="item-wrap" :style="{borderBottomColor: message.repeat? '#FA553D': 'D9D9D9'}">
        <i class="iconfont iconicon-Password icon"></i>
        <input v-model="formData.repeat" style="width:100%;" type="password" placeholder-class="placeholder-class"
         placeholder="确认密码" maxlength="16" @blur="check('repeat')"/>
      </view>
      <text :class="['message', message.repeat?'message-show':'message-hide']">{{message.repeat}}</text>
      
      <!-- 手机号 -->
      <view class="item-wrap" :style="{borderBottomColor: message.phone? '#FA553D': 'D9D9D9'}">
        <i class="iconfont iconicon-Cellphonenumber icon"></i>
        <text style="margin-right: 20rpx;">+86</text>
        <input
          placeholder-class="placeholder-class"
          style="width:100%;"
          type="number"
          v-model="formData.phone"
          placeholder="输入手机号码"
          maxlength="11"
          @blur="check('phone')"
        >
      </view>
      <text :class="['message', message.phone?'message-show':'message-hide']">{{message.phone}}</text>

      <view class="item-wrap" :style="{borderBottomColor: message.vertify? '#FA553D': 'D9D9D9'}">
        <i class="iconfont iconicon-VerificationCode icon"></i>
        <input
          placeholder-class="placeholder-class"
          style="width:100%;"
          v-model="formData.vertify"
          placeholder="输入验证码"
          maxlength="64"
          @blur="check('vertify')"
        >
        <a class="link" style="width: 210rpx; text-align: right;" @click="showDialog">{{sendMsg}}</a>
      </view>
      <text :class="['message', message.vertify?'message-show':'message-hide']">{{message.vertify}}</text>

      <view class="action">
        <button class="btn" :style="{background: ifContinue ? '#0062AC' : ''}" :disabled="!ifRegister" @click="handleRegister()">完成注册</button>
      </view>
    </view>

    <w-dialog :visible="visible" :maskClose="false">
      <div class="dialog">
        <div class="code-wrap">
          <span class="span">验证码</span>
          <input class="input" type="text" placeholder-class="placeholder-class"
          style="width:100%;"
          v-model="imageCode"
          placeholder="请输入">
          <img class="imgSrc" :src="vertifyInfo.image" @click="getImageCode">
        </div>
        <div class="btn-wrap">
          <button class="btn default" @click="handleInput">确定</button>
          <button class="btn cancel" @click="hideDialog">取消</button>
        </div>
      </div>
    </w-dialog>

    <view class="link-wrap">
      <span class="x-link" @click="golink('https://m.cloud.inspur.com/snipet/771.html')">继续即代表同意《浪潮云用户协议》及</span>
      <span class="x-link" @click="golink('https://m.cloud.inspur.com/snipet/935.html')">《云服务法律声明与隐私政策》</span>
    </view>
  </div>
</template>

<script>
export default {
  config: {
    navigationBarTitleText: '浪潮云注册'
  },
  data () {
    return {
      ifSendMsg: false,
      ifRegister: true,
      sendMsg: '获取验证码',
      visible: false,
      imageCode: '',
      vertifyInfo: {},
      passType:"password",
      formData: {
        phone: '',
        vertify: '',
        name: '',
        password: '',
        repeat: ''
      },
      message: { phone: '', vertify: '', name: '', password: '', repeat: '' }
    }
  },
  computed: {
    ifContinue () {
      const ary = []
      for (let key in this.formData) {
        ary.push(this.simplecheck(key))
      }
      const length = ary.filter(item => item === true).length
      return length === 5
    }
  },
  methods: {
    async showDialog () {
      if (this.ifSendMsg || !await this.check('phone')) return
      this.visible = true
    },
    trim (str) { return str.replace(/(^\s*)|(\s*$)/g, '') },
    golink (e) {
      this.$router.push({path: '/components/linkOut', query: {url: e}})
    },
    hideDialog () {
      this.imageCode = ''
      this.visible = false
      this.getImageCode()
    },
    handleInput () {
      if (!this.imageCode) {
        wx.showToast({
          icon: 'none',
          title: '请填写验证码',
          duration: 2000
        })
        return
      }
      this.$http.user
        .vertifyImageCode({ code: this.imageCode, key: this.vertifyInfo.key })
        .then(res => {
          if (res.code !== '200') {
            wx.showToast({
              icon: 'none',
              title: res.message,
              duration: 2000
            })
            this.getImageCode()
          } else {
            this.visible = false
            this.$http.user.verificationCode({function: 'register', type: 'phone', key: this.formData.phone, uuid: this.vertifyInfo.key}).then(res => {
              if (res.code == '200') {
                wx.showToast({
                  icon: 'none',
                  title: '验证码已发送到您的手机，请注意查收',
                  duration: 2000
                })
                this.ifSendMsg = true
                let count = 60
                let timer = ''
                if (timer) clearInterval(timer)
                timer = setInterval(() => {
                  count--
                  if (count === 0) {
                    this.sendMsg = '获取验证码'
                    this.ifSendMsg = false
                    this.imageCode = ''
                    this.getImageCode()
                    clearInterval(timer)
                  } else {
                    this.sendMsg = count + '秒后重新发送'
                  }
                }, 1000)
              } else {
                wx.showToast({
                  icon: 'none',
                  title: res.message,
                  duration: 2000
                })
              }
            })
          }
        })
        .catch(err => {
          console.log(err)
          this.visible = false
        })
    },
    async handleRegister () {
      const ary = []
      for (let key in this.formData) {
        ary.push(await this.check(key))
      }
      const length = ary.filter(item => item === true).length
      if (length === 5) {
        const params = {
          userName: this.formData.name,
          password: this.formData.password,
          phone: this.formData.phone,
          code: this.formData.vertify
        }
        this.ifRegister = false
        this.$http.user.register(params).then(res => {
          if (res.code === '0') {
            wx.showToast({
              icon: 'success',
              title: '注册成功',
              duration: 2000
            })
            this.$router.replace('account_login')
          } else {
            wx.showToast({
              icon: 'none',
              title: res.message,
              duration: 2000
            })
          }
        }).finally(res => {
          this.ifRegister = true
        })
      }
    },
    simplecheck (type) {
      if (type === 'phone') return this.checkphone(this.formData[type])
      if (type === 'vertify') return this.checkvertify(this.formData[type])
      if (type === 'name') return this.checkname(this.formData[type])
      if (type === 'password') return this.checkpassword(this.formData[type])
      if (type === 'repeat') return this.checkrepeat(this.formData[type])
      return true
    },
    async check (type) {
      if (type === 'password') return this.checkpassword(this.formData[type], true)
      if (type === 'repeat') return this.checkrepeat(this.formData[type], true)
      if (type === 'name' && this.checkname(this.formData[type], true)) {
        const check = await this.checkUser()
        return check
      }
      if (type === 'phone' && this.checkphone(this.formData[type], true)) {
        const check = await this.checkPhone()
        return check
      }
      if (type === 'vertify') return this.checkvertify(this.formData[type])
      return false
    },
    checkname (val, msg) {
      val = this.trim(val)
      if (val.length > 32 || val.length < 5) {
        if (msg) this.message.name = '请输入5-32个字符'
        return false
      }
      const reg = /^[a-z][a-z0-9-]*$/

      if (!reg.test(val)) {
        if (msg) this.message.name = '请使用小写字母数字或特殊符号（-）且只能以字母开头'
        return false
      }
      this.message.name = ''
      return true
    },
    checkpassword (val, msg) {
      val = this.trim(val)
      if (val.length > 16 || val.length < 8) {
        if (msg) this.message.password = '请输入8-16个字符'
        return false
      }
      const reg1 = /(?!^(\d+|[a-zA-Z]+|[~!@#$%.^&*?]+)$)^[\w~!@#$%.^&*?]{1,30}$/
      if (!reg1.test(val)) {
        if (msg) this.message.password = '至少包含大小写字母,数字或特殊字符中的两种'
        return false
      }
      const reverseVal = val.split('').reverse().join('')

      if (this.formData.name === val || this.formData.name === reverseVal) {
        if (msg) this.message.password = '不能与账号名或与倒叙账号名相同'
        return false
      }
      const reg3 = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
      if (reg3.test(val)) {
        if (msg) this.message.password = '不能包含电话号码'
        return false
      }
      this.message.password = ''
      return true
    },
    checkrepeat (val, msg) {
      val = this.trim(val)
      if (!val && msg) {
        this.message.repeat = '该项不能为空'
        return false
      }
      if (val !== this.formData.password) {
        if (msg) this.message.repeat = '两次输入的密码必须保持一致'
        return false
      }
      this.message.repeat = ''
      return true
    },
    checkvertify (val, msg) {
      val = this.trim(val)
      if (!val) {
        if (msg) this.message.vertify = '验证码不能为空'
        return false
      }
      this.message.vertify = ''
      return true
    },
    checkphone (val, msg) {
      val = this.trim(val)
      if (!val) {
        if (msg) this.message.phone = '手机号不能为空'
        return false
      }
      const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
      if (!reg.test(val)) {
        if (msg) this.message.phone = '请输入正确的手机号码'
        return false
      }
      this.message.phone = ''
      return true
    },
    checkPhone () {
      return this.$http.user.checkPhone({phone: this.formData.phone}).then(res => {
        if (res.code !== '200') {
          wx.showToast({
            icon: 'none',
            title: res.message,
            duration: 2000
          })
          return false
        }
        return true
      })
    },
    checkUser () {
      return this.$http.user.checkUser({userName: this.formData.name}).then(res => {
        if (res.code !== '200') {
          wx.showToast({
            icon: 'none',
            title: res.message,
            duration: 2000
          })
          return false
        }
        return true
      })
    },
    getImageCode () {
      this.$http.user.getImageCode().then(res => {
        if (res.code === '200') {
          this.imageCode = ''
          this.vertifyInfo = res.data
        }
      })
    },
    showPass(){
      if(this.passType == "password")
        this.passType = "text";
      else this.passType = "password";
    },
    clearUsername(){
      this.formData = {... this.formData,name:""};
    }
  },
  created () {
    this.getImageCode()
  },
  mounted () {
    this.ifSendMsg = false
    this.sendMsg = '获取验证码'
    this.visible = false
    this.imageCode = ''
    this.formData = {
      phone: '',
      vertify: '',
      name: '',
      password: '',
      repeat: ''
    }
    this.message = { phone: '', vertify: '', name: '', password: '', repeat: '' }
  }
}
</script>

<style lang="scss">
@import "@/css/common.scss";

.register-wrap {
  padding: 60rpx;
  background: #fff;
  height: 100%;
  @extend .vertical;
  .title-wrap {
    @extend .vertical;
    color: #020202;
    font-size: 56rpx;
  }

  .action-wrap {
    width: 100%;
    margin-top: 50rpx;
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
    .action-link {
      margin-top: 20rpx;
      display: flex;
      justify-content: space-between;
      @extend .link;
    }
  }

  .dialog {
    margin: 20rpx 30rpx;
    .btn-wrap {
      margin-top: 30rpx;
      display: flex;
      justify-content: center;
      .btn {
        flex: 1;
        margin: 0 20rpx;
        font-size: 36rpx;
      }
      .default {
        background: $primary-color;
        color: #fff;
      }
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
.link-wrap {
  position: fixed;
  bottom: 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  color: #999;
  font-size: 24rpx;
  .x-link {
    height: 38rpx;
  }
}
.code-wrap {
  display: flex;
  align-items: center;
  .span {
    flex: 1;
    font-size: 32rpx;
  }
  .input {
    flex: 1;
  }
  .imgSrc {
    width: 210rpx;
    height: 80rpx;
  }
}
</style>
