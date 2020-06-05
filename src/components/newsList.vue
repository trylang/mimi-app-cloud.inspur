<template>
  <view>
    <view class="news-list-item" v-for="(item, index) in newsLists" :key="index">
      <view class="news-list-item-lf">
        <text class="news-item-title" @click="goDetail(item.news_id)">{{item.news_title}}</text>
        <view class="news-item-date">发布时间：
          <text>{{item.view_time}}</text>
        </view>
      </view>
      <view class="news-list-item-rg" v-if="item.news_annex" >
        <img :src="api + item.news_annex "/>
      </view>
    </view>
  </view>

</template>

<script>
  import { environment } from '@/environments'
  export default {
    name: "newsList",
    props: {
      newsLists: {
        type: Array,
        default: []
      }
    },
    data(){
      return{
        api:environment.newsImage
      }
    },
    methods: {
      goDetail(itemId) {
        this.$router.push({path: '/pages/home/recommend/recommendDetail', query: {id: itemId}})
      }
    }

  }
</script>

<style scoped>
  .news-list-item {
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .news-list-item .news-list-item-lf {
    min-width: 212px;
  }

  .news-list-item .news-list-item-lf .news-item-title {
    font-size: 15px;
    line-height: 21px;
    color: #333;
    margin-bottom: 11px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .news-list-item .news-list-item-lf .news-item-date {
    color: #7F7F7F;
    font-size: 12px;
    line-height: 17px;
  }
  .news-list-item .news-list-item-rg{
    margin-left:10px;
  }
  .news-list-item .news-list-item-rg img {
    width: 95px;
    height: 61px;
  }
</style>
