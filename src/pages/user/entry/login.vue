<template>
  <view class='action-wrap'>
    <view class="item-wrap" v-for="(action, index) in actions" :key="index" @click="handleAction(action)">
      <view class="img-wrap marg-b-10" :style="{borderColor: action.bg}"><img class="img" :src="action.url" alt=""></view>
      <text>{{action.label}}</text>
    </view>
  </view>
</template>

<script>

export default {
  config: {
    navigationBarTitleText: '浪潮云登录'
  },

  data () {
    return {
      actions: [
      //   {
      //   id: 'wechat',
      //   url: '/static/tabs/home.png',
      //   bg: '#3CB033',
      //   label: '微信登录'
      // },
        {
          id: 'account',
          url: '/static/tabs/home.png',
          bg: '#0062AC',
          label: '账号登录'
        }]
    }
  },

  methods: {
    handleAction (action) {
      this.$router.push(`/pages/user/entry/${action.id}_login`)
    }
  }
}
</script>

<style lang="scss">
@import '@/css/common.scss';
.action-wrap {
  margin: 100rpx 150rpx;
  display: flex;
  justify-content: center;
  .item-wrap {
    color: $text-color;
    font-size: 30rpx;
    text-align: center;
    .img-wrap {
      width: 160rpx;
      height: 160rpx;
      line-height: 200rpx;
      text-align: center;
      border-radius: 50%;
      border: 1px solid #fff;
      .img {
        width: 80rpx;
        height: 80rpx;
      }
    }
  }
}

</style>

