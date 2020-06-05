<template name="recommend">
  <view class="news-list">
    <news-list :newsLists="newsLists"></news-list>
  </view>
</template>

<script>
  import NewsList from "@/components/newsList";

  export default {
    config: {
      navigationBarTitleText: '为你推荐',
      backgroundTextStyle: 'dark',
      enablePullDownRefresh: true,
    },
    components: {
      NewsList
    },
    data() {
      return {
        newsLists: [],
        page: 1,
      }
    },
    created() {
      this.init();
    },
    onPullDownRefresh () {
      this.init();
      wx.stopPullDownRefresh()
    },
    onReachBottom () {
      this.loadMore()
    },
    methods: {
      init(){
        this.$http.home.newsList({pageNum: 10, block_id: 1007, page: 1}).then(res => {
          this.newsLists = res.newslist;
        }).catch(err => {
        })
      },
      loadMore() {
        this.$http.home.newsList({pageNum: 10, block_id: 1007, page: ++this.page}).then(res => {
          this.newsLists = this.newsLists.concat(res.newslist);
        });
      }
    }
  }
</script>

<style>
  .news-list {
    padding: 10px 15px;
    background: #F6F6F6;
    box-sizing: border-box;
  }

  .news-list-item {
    padding: 12px 14px 12px 14px;
    padding-left: 14px;
    margin-bottom: 10px;
    border-bottom: none;
    border-radius:5px;
  }

</style>
