<template>
  <div class="all">
    <div class="noData" v-if="isNoData">
      <i class="iconfont iconicon-Emptystate"></i>
      <p>您没有待处理消息</p>
      <navigator url="/pages/user/index" open-type="switchTab">
        <button type="default">返回</button>
      </navigator>
    </div>
    <div v-else>
      <div class="allList">
        <div
          class="list"
          v-for="(item,index) in infoList"
          :key="index"
          @click="toInfoDetail(item.id,index,infoList)"
        >
          <div class="common clo1_other">
            <!-- 非系统通知 -->
            <i class="iconfont iconiconcommunitydef"></i>
          </div>
          <div class="clo2">
            <p>{{item.title}}</p>
            <span>{{item.createdTime}}</span>
          </div>
          <div class="clo3">
            <b v-if="item.readStatus==='N'"></b>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  config: {
    navigationBarTitleText: "消息中心",
    enablePullDownRefresh: true
  },
  data() {
    return {
      isNoData: false,
      infoList: [],
      params: {
        messageType: "all",
        start: 0,
        length: 10
      },
      totalpage: 0,
      num: 1,
      isClose: true,
      clickIndex: null
    };
  },
  mounted() {
    this.infoList = [];
    this.params.start = 0;
    this.num = 1;
    this.init();
  },
  onPullDownRefresh: function() {
    this.infoList = [];
    this.params.start = 0;
    this.num = 1;
    this.init(); //刷新页面
    wx.stopPullDownRefresh();
  },

  onReachBottom: function() {
    var totalpage = this.totalpage + 1;
    this.params.start = 10 * this.num++;
    if (this.params.start > totalpage) {
      return;
    }
    this.init();
  },
  methods: {
    init() {
      this.$http.control.message(this.params).then(res => {
        this.infoList = this.infoList.concat(res.result.data);
        this.totalpage = res.result.iTotalRecords;
        if (this.infoList.length === 0) {
          this.isNoData = true;
        } else {
          this.isNoData = false;
        }
      });
    },
    // index 对应item.id  i对应index
    toInfoDetail(index, i, infoList) {
      this.isClose = false;
      var saveList = wx.setStorageSync("allList", infoList);
      this.clickIndex = i;
      wx.navigateTo({
        url: `/pages/user/infoDetails/infoDetails?index=${i}`
      });
    }
  },

  // 以下功能用于从消息详情页返回，重置未读状态（并未从接口返回）
  onUnload: function() {
    // 页面销毁时
    var that = this;
    setTimeout(function() {
      that.isClose = true;
    }, 200);
  },
  // onHide: function() {
  //   //页面隐藏时
  //   if (this.isClose) {
  //   }
  // },
  onShow: function() {
    if (!this.isClose) {
      for (const item of this.infoList) {
        this.infoList[this.clickIndex].readStatus = "Y";
      }
    }
  }
};
</script>
<style scoped>
page {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  background: rgba(246, 246, 246, 1);
}
.all {
  /* position: relative; */
  width: 100%;
  background-color: #fff;
}
.allList {
  box-sizing: border-box;
  border-top: 1px solid #f6f6f6;
}
.noData {
  width: 300rpx;
  height: 300rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -150rpx;
  margin-left: -150rpx;
  text-align: center;
}
.noData .iconfont {
  font-size: 103rpx;
  color: #ccc;
}
.noData p {
  color: #666;
  font-size: 28rpx;
  margin: 37rpx 0;
}

.list {
  display: flex;
  justify-content: space-between;
  color: #333;
  font-size: 32rpx;
  box-sizing: border-box;
  font-weight: 400;
  padding: 20rpx 30rpx 20rpx 0;
  margin-left: 30rpx;
  border-bottom: 1px solid #f6f6f6;
}
.clo2 {
  width: 83%;
}
.clo2 span {
  color: #999;
  font-size: 28rpx;
  display: inline-block;
  margin-top: 10rpx;
  font-weight: 400;
  margin-left: 7rpx;
}
.common {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  text-align: center;
  line-height: 80rpx;
}

.clo1 {
  background-color: #0062ac;
}
.clo1_other {
  background-color: #dceafa;
}
.clo1 .iconfont {
  font-size: 50rpx;
  color: #fff;
}
.clo1_other .iconfont {
  font-size: 40rpx;
  color: #00a0eb;
}
.clo1 .hh {
  background-color: #342972;
}
.clo3 b {
  display: block;
  width: 16rpx;
  height: 16rpx;
  background: rgba(230, 23, 47, 1);
  border: 4rpx solid rgba(255, 255, 255, 1);
  margin-top: 20rpx;
  border-radius: 50%;
}
</style>

