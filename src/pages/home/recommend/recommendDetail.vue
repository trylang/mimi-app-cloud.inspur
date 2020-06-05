<template>
  <view class="page">
    <text class="h2">{{newsTitle}}</text>
    <view class="public-date">
      <view class="public-date-lf">发布时间：
        <text>{{newsTime}}</text>
      </view>
      <view class="public-date-rg">
        <!--<button open-type='share' class="share"><i class="iconfont icondef2"></i></button>-->
      </view>
    </view>
    <view class="content">
      <rich-text :nodes="newsHtml" class="newsDetail"></rich-text>
    </view>
  </view>
</template>

<script>
  import { environment } from '@/environments'
  export default {
    name: "index",
    config: {
      navigationBarTitleText: '新闻详情',
    },
    data() {
      return {
        newsTitle: "",
        newsTime: "",
        newsHtml: "",
        api: environment.newsImage
      }
    },
    onReady() {
      this.$http.home.newsDetail({news_id: this.$router.currentRoute.query.id, block_id: 1007}).then((res) => {
        this.newsTitle = res.news.news_title;
        // this.config.navigationBarTitleText = res.news.news_title;
        this.newsTime = res.news.view_time;
        let cnt = res.news.news_content.replace(/src="/gi,  'src="' + this.api);
        cnt = cnt.replace(/\<br>/gi, '');
        cnt = cnt.replace(/<img[^>]*>/gi,function(match,capture) {
          let matchQ = match.replace(/style=\"(.*)\" /gi,  ' ');
          return matchQ;
        })
        cnt = cnt.replace(/<img[^>]*>/gi,function(match,capture) {
          let matchQ = match.replace(/style=\"(.*)\">/gi,  '>');
          return matchQ;
        })
        cnt = cnt.replace(/<img[^>]*>/gi,function(match,capture) {
          if(match.includes('class=')){
            return match.replace(/class="(.*?)(?=\")/, 'class="$1 '+ 'img-responsive');
          }else{
            return match.replace(/\<img (.*?)(?=\")/, '<img class="'+ 'img-responsive' +'" $1');
          }
        })
        this.newsHtml = cnt;
      }).catch(err => {
      })
    }
  }
</script>

<style scoped>
  .page {
    border-top:1px solid #EAEAEA;
    padding: 28px 15px;
    position:absolute;
    top:0;
    left:0;
    right:0;
    background-color: #fff !important;
  }

  .h2 {
    font-size: 24px;
    color: #333;
    line-height: 1.2;
  }

  .public-date {
    padding-top: 11px;
    padding-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #888888;
    font-size: 15px;
  }

  .page img {
    display: block;
    width: 100%;
    height: auto;
    margin-bottom: 12px;
    margin-top: 12px;
  }

  .newsDetail {
    font-size: 16px;
    color: #111;
    line-height: 30px;
    backgroud:#fff !important;
  }

  .share {
    background: none;
    border: none;
    outline: none;
  }
</style>
