<template>
  <div class="page">
    <view class="news-list" style="height:calc(100vh - 70px);" >
      <!--banner图开始-->
      <!--<view>-->
      <swiper :indicator-dots="indicatorDots" :circular="circular" previous-margin="15px" next-margin="15px"
              :interval="interval" :duration="duration"   :autoplay="autoplay" indicator-active-color="#00A0EB" indicator-color="#fff">
        <block v-for="(item, index) in bannerList" :key="index">
          <swiper-item class="banner-item">
            <image :src="item.imageUrl" class="slide-image" @click="goOutHtml(item.targetUrl)"/>
          </swiper-item>
        </block>
      </swiper>
      <!--banner图结束-->
      <!--导航开始-->
      <view class="nav">
        <view class="nav-item" @click="goActivities">
          <view class="nav-item-tp"><image :src="imageUrl[1]" /></view>
          <text class="nav-item-btm">热门活动</text>
        </view>
        <view class="nav-item" @click="goProduction">
          <view class="nav-item-tp"><image :src="imageUrl[2]" /></view>
          <text class="nav-item-btm">云产品</text>
        </view>
        <view class="nav-item" @click="goSolution">
          <view class="nav-item-tp"><image :src="imageUrl[3]" /></view>
          <text class="nav-item-btm">解决方案</text>
        </view>
        <view class="nav-item" @click="goKefu">
          <view class="nav-item-tp"><image :src="imageUrl[4]" /></view>
          <text class="nav-item-btm">在线客服</text>
          <button
            class="nav-item-btm contact-btm"
            v-if="userInfo.nickName"
            open-type="contact"
            id="onlineCusSer"
            :session-from="sessionFrom"
          ></button>
        </view>
      </view>
      <!--导航结束-->
      <view class="recommend">
        <view class="panel-title">
          <text class="h2">为你推荐</text>
          <text class="more" @click="goRecommend">更多</text>
        </view>
        <view class="news-list">
          <news-list :newsLists="newsLists"></news-list>
        </view>
      </view>
    </view>
  </div>


</template>

<script>
  import NewsList from '@/components/newsList'
import { environment } from '@/environments'

  export default {
    config: {
      navigationBarTitleText: '浪潮云',
      navigationBarBackgroundColor: '#0062ac',
      navigationBarTextStyle: 'white',
      backgroundTextStyle: 'dark',
      enablePullDownRefresh: true
    },
    components: { NewsList },
    data () {
      return {
        userInfo: mpvue.getStorageSync('userInfo'),
        imageUrl: {
          1: `${environment.assets}/images/icon01.svg`,
          2: `${environment.assets}/images/icon02.svg`,
          3: `${environment.assets}/images/icon03.svg`,
          4: `${environment.assets}/images/icon04.svg`
        },
        indicatorDots: true,
        autoplay: true,
        circular: true,
        interval: 4000,
        duration: 300,
        page: 1,
        loading: false,
        newsLists: []
      }
    },
    computed: {
      bannerList () {
        return this.$store.state.bannerList
      },
      sessionFrom () {
        return `7moor|${this.userInfo.nickName}|${this.userInfo.avatarUrl}`
      }
    },
    onShow () {
      if (!this.userInfo) {
        this.userInfo = mpvue.getStorageSync('userInfo')
      }
    },
    onPullDownRefresh () {
      this.init()
      wx.stopPullDownRefresh()
    },
    onReachBottom () {
      this.loadingChange()
    },
    onShareAppMessage(obj) {
      return {
        title: "无处不在的计算",
        imageUrl: `${environment.assets}/images/share.png`,
        path: "/pages/home/index"
        // imageUrl:"../../static/images/share.png",
      };
    },
    created () {
      this.init()
    },
    methods: {
      init(){
        this.$http.home.newsList({pageNum: 10, block_id: 1007, page: 1}).then(res => {
          this.newsLists = res.newslist
        }).catch(err => {
        });
        //设置banner图数组
        this.$http.home.bannerList().then(res => {
          this.$store.dispatch("setBannerList",res.result);
        }).catch(err => {
        });
      },
      goKefu () {
        if (!this.userInfo.nickName) {
          this.$router.push({path: '/pages/user/entry/auth', query: {path: '/pages/home/index'}})
        }
      },
      onGotUserInfo () {
        wx.getUserInfo({
          success: function (res) {
            mpvue.setStorageSync('userInfo', res.userInfo)
          }
        })
      },
      checkToken() {
        this.$http.user.info().then(res => {
        })
      },
      buttonClick() {
        this.$router.push({path: '/pages/control/index', isTab: true})
      },
      goRecommend() {
        this.$router.push({path: '/pages/home/recommend/recommendList'})
      },
      goActivities() {
        this.$router.push({path: '/pages/home/activities/activitiesList'})
      },
      goProduction() {
        this.$router.push({path: '/pages/home/production/productionList'})
      },
      goSolution() {
        this.$router.push({path: '/pages/home/solution/solutionList'})
      },
      loadingChange() {
        this.$http.home.newsList({pageNum: 10, block_id: 1007, page: ++this.page}).then(res => {
          this.newsLists = this.newsLists.concat(res.newslist);
        });
      },
      goOutHtml(linkUrl){
        this.$router.push({path:"/components/linkOut",query: {url: linkUrl}});
      }
    }
  }
</script>

<style>
  /* 隐藏滚动条 */
  ::-webkit-scrollbar{
    width: 0;
    height: 0;
    color: transparent;
  }
  .page {
    height: 100vh;
    padding-top: 10px;
    box-sizing: border-box;
    background:#fff;
  }

  .banner-item {
    padding: 0 5px;
    box-sizing: border-box;
    width: 100%;
  }

  .banner-item image {
    width: 100%;
    height: 166px;
    border-radius:4px;
  }

  .nav {
    height: 114px;
    width: 375px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-item {
    /*padding-bottom: 19px;*/
    width:25%;
    position:relative;
  }

  .nav-item-tp {
    margin-bottom: 10px;
  }
  .nav-item-tp image{
    width:41px;
    height:41px;
    display:block;
    margin:0 auto;
  }
  .nav-item-btm {
    color: #333;
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;
    text-align:center;
    width:100%;
    display:block;
  }

  .panel-title {
    padding: 11px 16px 17px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .panel-title .h2 {
    font-size: 18px;
    line-height: 25px;
    color: #333;
    /*font-weight: bold;*/
  }

  .panel-title .more {
    font-size: 12px;
    line-height: 17px;
    color: #666666;
  }

  .recommend {
    padding-left: 19px;
    border-top: 10px solid #F6F6F6;
    background:#fff;
  }

  .news-list-item {
    padding: 12px 16px 12px 0;
    border-bottom: 0.5px solid #D9D9D9;
  }
  .news-list .news-list-item:last-child{
    border-bottom:none;
  }
  .contact-btm {
    /*position: ;*/
    position:absolute;
    background:none;
    border:none;
    outline:none;
    z-index:1;
    top:0;
    left:0;
    right:0;
    bottom:0;
  }
  .contact-btm::after{
      border: none;
  }
</style>
