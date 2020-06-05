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
      <!--banner图结束-->
      <view class="activities">
        <view class="panel-title"><text class="h2">热门活动</text><view class="more" @click="goOutHtml('https://m.cloud.inspur.com/')">更多</view></view>
        <view class="activities-list">
          <view class="activities-list-item" @click="goOutHtml('https://m.cloud.inspur.com/activity/enterprise-shangyun/')">
            <view class="activities-item-lf">
              <img :src="imgUrl[0]" />
            </view>
            <view class="activities-item-rg">
              <text class="h2">企业上云</text>
              <text class="memo">助力企业显著提高商业效益</text>
            </view>
          </view>
          <view class="activities-list-item"  @click="goOutHtml('https://m.cloud.inspur.com/activity/free-trial/')">
            <view class="activities-item-lf">
              <img :src="imgUrl[1]" />
            </view>
            <view class="activities-item-rg">
              <text class="h2">0元试用</text>
              <text class="memo">SaaS企业服务新引擎</text>
            </view>
          </view>
          <view class="activities-list-item" @click="goOutHtml('https://m.cloud.inspur.com/guangsuyunjihua.html')">
            <view class="activities-item-lf">
              <img :src="imgUrl[2]" />
            </view>
            <view class="activities-item-rg">
              <text class="h2">光速云计划</text>
              <text class="memo">光速助力中小企业数字化转型</text>
            </view>
          </view>
        </view>
      </view>
    </div>
</template>

<script>
  import { environment } from '@/environments'
    export default {
      name: "index",
      config: {
        navigationBarTitleText: '热门活动'
      },
      data(){
        return{
          indicatorDots: true,
          autoplay: true,
          circular: true,
          interval: 4000,
          duration: 300,
          imgUrl:[
            `${environment.assets}/images/icon-activity01.svg`,
            `${environment.assets}/images/icon-activity02.svg`,
            `${environment.assets}/images/icon-activity03.svg`,
          ]
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
  .activities{
    padding:0 17px;
    height:350px;
  }
  .panel-title{
    padding-top:23px;
    padding-bottom:9px;
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
  .activities-list-item{
    padding:19px 26px 22px;
    margin-bottom:10px;
    background:#fff;
    display:flex;
    justify-content: center;
    align-items: center;
  }
  .activities-list .activities-list-item:nth-child(1) img{
     height:40px;
   }
  .activities-list .activities-list-item:nth-child(2) img{
    height:40px;
  }
  .activities-list .activities-list-item:nth-child(3) img{
    height:40px;
  }
  .activities-item-lf{
    margin-right:25px;
  }
  .activities-item-lf img{
    width:45px;

  }
  .activities-item-rg{
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width:196px;
  }
  .activities-item-rg .h2{
    font-size:18px;
    line-height:25px;
    color:#333;
    /*font-weight:bold;*/
    margin-bottom:12px;
  }
  .activities-item-rg .memo{
    font-size:14px;
    color:#333;
    line-height:20px;
  }
</style>
