<template>
  <view class="productions">
    <view class="productions-list">
      <view class="productions-list-item" @click="goOutHtml('https://m.cloud.inspur.com/product/InServer/')">
        <view class="productions-item-tp">
          <i class="iconfont iconyunfuwuqiECS"></i>
        </view>
        <view class="productions-item-btm">
          <text class="h3">云服务器ECS</text>
        </view>
      </view>
      <view class="productions-list-item"  @click="goOutHtml('https://m.cloud.inspur.com/product/InDisk/')">
        <view class="productions-item-tp">
          <i class="iconfont iconyunyingpanEBS"></i>
        </view>
        <view class="productions-item-btm">
          <text class="h3">云硬盘EBS</text>
        </view>
      </view>
      <view class="productions-list-item" @click="goOutHtml('https://m.cloud.inspur.com/product/InFile/')">
        <view class="productions-item-tp">
          <i class="iconfont iconduixiangcunchuOSS"></i>
        </view>
        <view class="productions-item-btm">
          <text class="h3">对象存储OSS</text>
        </view>
      </view>
    </view>
    <view class="productions-list">
      <view class="productions-list-item" @click="goOutHtml('https://m.cloud.inspur.com/product/VPC2/')">
        <view class="productions-item-tp">
          <i class="iconfont iconxunisiyouwangluo"></i>
        </view>
        <view class="productions-item-btm">
          <text class="h3">虚拟私有网络</text>
        </view>
      </view>
      <view class="productions-list-item" @click="goOutHtml('https://m.cloud.inspur.com/product/InNet/')">
        <view class="productions-item-tp">
          <i class="iconfont icondanxinggongwangIPEIP"></i>
        </view>
        <view class="productions-item-btm">
          <text class="h3">弹性公网IP</text>
        </view>
      </view>
      <view class="productions-list-item" @click="goOutHtml('https://m.cloud.inspur.com/product/InCDN/')">
        <view class="productions-item-tp">
          <i class="iconfont iconneirongfenfa"></i>
        </view>
        <view class="productions-item-btm">
          <text class="h3">内容分发网络</text>
        </view>
      </view>
    </view>
    <view class="productions-list">
      <view class="productions-list-item" @click="goOutHtml('https://m.cloud.inspur.com/')">
        <text class="h3">更多</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "proList",
    methods:{
      goOutHtml(linkUrl){
        this.$router.push({path:"/components/linkOut",query: {url: linkUrl}});
      }
    }
  }
</script>

<style scoped>
  .productions .productions-list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #D9D9D9;
  }
  .productions .productions-list:last-child{
    border-bottom:none;
  }
  .productions .productions-list:last-child {
    boder-bottom: none;
  }

  .productions-list .productions-list-item:nth-child(3n) {
    border-right: none;
  }

  .productions-list-item {
    box-sizing: border-box;
    padding: 28px 0 22px;
    height: 113px;
    width: 125px;
    border-right: 1px solid #D9D9D9;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .productions-item-tp {
    margin-bottom: 15px;
  }

  .productions-item-btm {

  }

  .productions-list-item .h3 {
    font-size: 14px;
    color: #333;
    /*font-weight: bold;*/
    display: block;
  }

  .productions-list-item .iconfont {
    font-size: 36px;
    color: #00A0EB;
  }
</style>
