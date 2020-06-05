import common from '../common'

const request = common.request
const simpleRequest = common.simpleRequest
const baseURL = common.baseURL
const news = common.news

// 首页模块，调用方法：this.$http.home.xx()
export default {
  home: {
    info: params => request.get(`${baseURL}/home/info`, params),
    newsList: params => simpleRequest.get(`${news}/cloudactivity.newslist.phtml`, params),
    newsDetail: params => simpleRequest.get(`${news}/cloudactivity.newsdetail.phtml`, params),
    bannerList: () => simpleRequest.get(`${baseURL}/miniapp/banners`)
  }
}
