<template>
  <view :class="['tabbar_box',{'padb-10':isIOS}]" :style="{'background-color':tabBar.backgroundColor, 'border-top-color':tabBar.borderStyle}">
    <block v-for="(item,index) in list"  :key="index">
      <view class="tabbar_nav"  @click="navTo(item.pagePath,index)">
        <img class="tabbar_icon" :src="item.selectedIconPath" v-if="tabBarActiveList[index]" />
        <img class="tabbar_icon" :src="item.iconPath" v-if="!tabBarActiveList[index]" />
        <text :style="{color:tabBarActiveList[index] ? tabBar.selectedColor : tabBar.color}">{{item.text}}</text>
      </view>
    </block>
  </view>
</template>

<script>
  export default {
    name: "tabBar",
    data(){
      return{
        tabBar: {
          "backgroundColor": "#fafafa",
          "selectedColor": "#0062AC",
          "color": "#7F7F7F",
          "borderStyle": "#d9d9d9",
          "position": "bottom"
        },
        "list": [
          {
            "text": "浪潮云",
            "pagePath": "/pages/home/index",
            "iconPath": "/static/tabs/home.png",
            "selectedIconPath": "/static/tabs/home-active.png",
          },
          {
            "text": "控制台",
            "pagePath": "/pages/control/index",
            "iconPath": "/static/tabs/orders.png",
            "selectedIconPath": "/static/tabs/orders-active.png",
          },
          {
            "text": "我的",
            "pagePath": "/pages/user/index",
            "iconPath": "/static/tabs/my.png",
            "selectedIconPath": "/static/tabs/my-active.png",
          }
        ],
      }

    },
    computed:{
      tabBarActiveList: function(){
        return this.$store.state.tabBar;
      },
      isIOS:function(){
        return this.$store.state.isIphoneX;
      }
    },
    created(){

    },
    methods: {
      navTo(pageUrl,index) {
        changeTab(context,obj) {
          let list = [];
          for(let i=0;i<context.state.tabBar.length;i++){
            if(i != obj.index) {
              list[i] = false;
            } else {
              list[i] = true;
            }
          }
          wx.switchTab({
            url: obj.pageUrl,
            success:() => {
              context.commit("CHANGETAB",list);
            },
            fail(e) {
            }
          });
        }
      }
    }
  }
</script>

<style>

  .tabbar_box{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    position: fixed;
    bottom:0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 120rpx;
    border-top: 1rpx solid #d9d9d9;
  }
  .padb-10{
    padding-bottom:10px;
  }
  .tabbar_nav{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    height: 100%;
  }

  .tabbar_icon{
    width: 50rpx;
    height:50rpx;
  }

</style>
