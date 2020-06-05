<template>
    <div class="page">
      <!--banner图开始-->
      <swiper :indicator-dots="indicatorDots" :circular="circular" previous-margin="15px" next-margin="15px"
              :interval="interval" :duration="duration"  :autoplay="autoplay" indicator-active-color="#00A0EB" indicator-color="#fff">
        <block  v-for="(item, index) in bannerList"  :key="index" >
          <swiper-item class="banner-item">
            <image :src="item.imageUrl" class="slide-image" @click="goOutHtml(item.targetUrl)" />
          </swiper-item>
        </block>
      </swiper>
      <view class="panel-title"><text class="h2">云产品</text><view class="more" @click="goOutHtml('https://m.cloud.inspur.com/')">更多</view></view>
      <!--banner图结束-->
      <!--云产品列表开始-->
      <ProList></ProList>
      <!--云产品列表结束-->
    </div>
</template>

<script>
  import ProList from "@/components/proList";
    export default {
      name: "index",
      config: {
        navigationBarTitleText: '云产品'
      },
      components:{ ProList },
      data(){
        return{
          indicatorDots: true,
          autoplay: true,
          circular: true,
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
  .panel-title{
    padding:23px 17px 9px;
    display:flex;
    justify-content: space-between;
    align-items: center;
    background:#F6F6F6;
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


</style>
