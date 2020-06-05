import common from '../common'
import store from '@/store'

const simpleRequest = common.simpleRequest
const request = common.request
const baseURL = common.baseURL

function httpOptions () {
  return {
    headers: {
      'Authorization': guid(),
      'content-type': 'application/json'
    }
  }
}

function guid () {
  function S4 () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}

/** 获取 userId */
function getUserId () {
  debugger
  return store.getters.getUserInfo.userId
}

// 用户模块， 调用方法：this.$http.user.xx()
export default {
  user: {
    login: params => simpleRequest.post(`${baseURL}/miniapp/login/doLogin`, params),
    checkMFA: params => simpleRequest.post(`${baseURL}/miniapp/login/validTotp`, params),
    register: params => simpleRequest.post(`${baseURL}/miniapp/register`, params),
    verificationCode: params => simpleRequest.post(`${baseURL}/user/v1/verification-codes`, params, httpOptions()),
    checkUserRealName: () => request.get(`${baseURL}/user/${getUserId()}/auth`),
    checkUser: params => simpleRequest.get(`${baseURL}/user/v1/users/usernames/${params.userName}`, {}, httpOptions()),
    checkPhone: params => simpleRequest.get(`${baseURL}/user/v1/users/phones/${params.phone}`, {}, httpOptions()),
    getImageCode: params => simpleRequest.get(`${baseURL}/user/v1/verification-codes/image`, params),
    vertifyImageCode: params => simpleRequest.get(`${baseURL}/user/v1/verification-codes/image/key/${params.key}/code/${params.code}`),
    vertifyPhoneCode: params => simpleRequest.get(`${baseURL}/user/v1/verification-codes/function/register/codes/${params.code}/keys/${params.key}`)
  }
}
