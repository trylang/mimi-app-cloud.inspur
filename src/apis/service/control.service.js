import common from '../common'
import store from '@/store'

const request = common.request
const baseURL = common.baseURL

/** 获取 userId */
function getUserId() {
  return store.getters.getUserInfo.userId
}
// 控制台模块，调用方法：this.$http.control.xx().then(res => {})
export default {
  control: {
    info: params => request.get(`${baseURL}/control/info`, params),
    // 获取余额
    balance: () => request.get(`${baseURL}/account/${getUserId()}/balance`),
    // 获取待支付
    payment: () => request.get(`${baseURL}/order/?userId=${getUserId()}&orderStatus=unPaid`),
    // 获取订单
    order: () => request.get(`${baseURL}/operation/workorders/billCount?status=toDeal,toFeedback,toVerify`),
    // 获取代金券
    coupon: () => request.get(`${baseURL}/account/${getUserId()}/coupon/number`),
    // 消息中心
    message: params => request.get(`${baseURL}/operation/message?messageType=${params.messageType}&start=${params.start}&length=${params.length}
    `),
    // 已读
    read: (params) => request.post(`${baseURL}/miniapp/message/unread`, params)

  }
}
