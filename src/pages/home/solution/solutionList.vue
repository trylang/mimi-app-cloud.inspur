<template>
  <div class="page">
    <!--banner图开始-->
    <swiper :indicator-dots="indicatorDots" :circular="circular" previous-margin="15px" next-margin="15px"
             :interval="interval" :duration="duration"  :autoplay="autoplay" indicator-active-color="#00A0EB" indicator-color="#fff" >
      <block  v-for="(item, index) in bannerList"  :key="index" >
        <swiper-item class="banner-item">
          <image :src="item.imageUrl" class="slide-image" @click="goOutHtml(item.targetUrl)" />
        </swiper-item>
      </block>
    </swiper>
    <!--banner图结束-->
    <view class="productions">
      <view class="panel-title"><text class="h2">解决方案</text><view class="more" @click="goOutHtml('https://m.cloud.inspur.com/')">更多</view></view>
      <view class="productions-list">
        <view class="productions-list-item" @click="goOutHtml('https://m.cloud.inspur.com/solution/Website-building/')">
          <view class="productions-item-tp">
            <i class="iconfont iconjianzhan"></i>
          </view>
          <view class="productions-item-btm">
            <text class="h3">建站</text>
          </view>
        </view>
        <view class="productions-list-item" @click="goOutHtml('https://m.cloud.inspur.com/solution/Cloud-accounting/')">
          <view class="productions-item-tp">
            <i class="iconfont iconyunhuiji"></i>
          </view>
          <view class="productions-item-btm">
            <text class="h3">云会计</text>
          </view>
        </view>
        <view class="productions-list-item" @click="goOutHtml('https://m.cloud.inspur.com/solution/Invoicing-cloud/')">
          <view class="productions-item-tp">
            <i class="iconfont iconyunjinxiaocun"></i>
          </view>
          <view class="productions-item-btm">
            <text class="h3">云进销存</text>
          </view>
        </view>
      </view>
      <view class="productions-list">
        <view class="productions-list-item" @click="goOutHtml('https://m.cloud.inspur.com/solution/Cloud-hosting/')">
          <view class="productions-item-tp">
            <i class="iconfont iconyuntuoguan"></i>
          </view>
          <view class="productions-item-btm">
            <text class="h3">云托管</text>
          </view>
        </view>
        <view class="productions-list-item" @click="goOutHtml('https://m.cloud.inspur.com/solution/Melt-media-cloud/')">
          <view class="productions-item-tp">
            <i class="iconfont iconrongmeiti"></i>
          </view>
          <view class="productions-item-btm">
            <text class="h3">融媒体</text>
          </view>
        </view>
        <view class="productions-list-item" @click="goOutHtml('https://m.cloud.inspur.com/solution/cloud-acceleration/')">
          <view class="productions-item-tp">
            <i class="iconfont iconjianzhan"></i>
          </view>
          <view class="productions-item-btm">
            <text class="h3">云加速</text>
          </view>
        </view>
      </view>
      <view class="productions-list">
        <view class="productions-list-item" @click="goOutHtml('https://m.cloud.inspur.com/')">
          <text class="h3">更多</text>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
  export default {
    name: "index",
    config: {
      navigationBarTitleText: '解决方案'
    },
    data(){
      return{
        indicatorDots: true,
        autoplay: true,
        circular: true,
        indicatorDots:true,
        interval: 4000,
        duration: 300,
      }
    },
    computed:{
      bannerList:function(){
        return this.$store.state.bannerList;
      }
    },
    methods:{
      goOutHtml(linkUrl){
        this.$router.push({path:"/components/linkOut",query: {url: linkUrl}});
      }
    }
  }
</script>

<style scoped>
  .page{
    height:100vh;
    background:#F6F6F6;
    padding-top:10px;
    box-sizing: border-box;
  }
  .banner-item{
    padding:0 5px;
    box-sizing: border-box;
    width:100%;
  }
  .banner-item image{
    width:100%;
    height:166px;
    border-radius:4px;
  }
  .productions{
    background:#F6F6F6;
    height:415px;
  }
  .panel-title{
    padding:23px 17px 9px;
    display:flex;
    justify-content: space-between;
    align-items: center;
  }
  .panel-title .h2{
    font-size:18px;
    line-height:25px;
    color:#333;
    /*font-weight:bold;*/
  }
  .panel-title .more{
    font-size:12px;
    line-height:17px;
    color:#666666;
  }
  .productions .productions-list{
    display:flex;
    justify-content: flex-start;
    align-items: center;
    background:#fff;
    border-bottom:1px solid #D9D9D9;
  }
  .productions .productions-list:last-child{
    border-bottom:none;
  }
  .productions .productions-list:last-child{
    boder-bottom:none;
  }
  .productions-list .productions-list-item:nth-child(3n){
    border-right:none;
  }
  .productions-list-item{
    box-sizing: border-box;
    padding:28px 0 22px;
    height:113px;
    width:125px;
    border-right:1px solid #D9D9D9;
    display:flex;
    justify-content:center;
    align-items: center;
    flex-direction: column;
  }
  .productions-item-tp{
    margin-bottom:16px;
  }
  .productions-item-btm{

  }
  .productions-list-item .h3{
    font-size:14px;
    color:#333;
    /*font-weight:bold;*/
    display:block;
  }
  .productions-list-item .iconfont{
    font-size:36px;
    color:#00A0EB;
  }
</style>
