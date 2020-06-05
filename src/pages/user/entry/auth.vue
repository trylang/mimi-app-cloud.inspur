<template>
  <div class="content">
    <image class="img" src="/static/users/logo.png"/>
    <h1 class="title">浪潮云</h1>
    <h5 class="desc">欢迎使用 浪潮云助手</h5>
    
    <button class="btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">授权登录</button>

  </div>
</template>

<script>
export default {
  config: {
    navigationBarTitleText: '授权登录',
    navigationBarTextStyle: 'white',
    navigationBarBackgroundColor: '#0060B0'
  },
  methods: {
    onGotUserInfo () {
      wx.getUserInfo({
        success: res => {
          mpvue.setStorageSync('userInfo', res.userInfo)
          this.$router.push({path: this.path || '/pages/user/index', isTab: true})
        }
      })
    }
  },
  data () {
    return {
      path: ''
    }
  },
  mounted () {
    this.path = this.$route && this.$route.query.path
  }

}
</script>

<style lang="scss">
.content {
  margin: 154rpx auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .img {
    width: 200rpx;
    height: 200rpx;
  }

  .title {
    margin: 36rpx 0;
    font-size: 36rpx;
  }
  .desc {
    color: #888;
    font-size: 30rpx;
  }

  .btn {
    margin-top: 100rpx;
    width:670rpx;
    height:96rpx;
    background:rgba(26,173,26,1);
    border-radius:48rpx;
    border:2rpx solid rgba(5,5,5,0.08);
    color: #fff;
    font-size: 36rpx;
  }
  
}

</style>