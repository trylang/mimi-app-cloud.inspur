/* eslint-disable no-throw-literal */
import cookies from 'weapp-cookie'
import Fly from 'flyio/dist/npm/wx'
import store from '@/store'
import { environment } from '@/environments'
import { Base64 } from 'js-base64'

let fly = new Fly()

fly.config.withCredentials = false

/**
 * fun(){} 普通函数
 * _fun(){} 内部函数 类似于ts中的private
 * $fun(){} 异步函数 返回一个promise
 * _$fun(){} 内部的异步函数
*/
export default class KeycloakService {
    auth = {
      authUrl: environment.authUrl,
      authRealm: environment.authRealm,
      authClientId: environment.authClientId,
      domain: environment.domain
    }

    api = environment.api

    httpOptions = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    /** token 刷新时间 */
    timeSkew
    expiresTime = 30 * 60 * 1000 // ms
    refreshExpiresTime = 7200 - 60 // s

    refreshTimes = 0
    autoLoginTimes = 0

    /** 初始化 */
    init () {
      store.commit('changeUserAuthStatus', 'notauth')
      if (cookies.has('refresh_token')) {
        if (!cookies.getCookie('refresh_token').isExpired()) {
          store.commit('setRefreshToken', cookies.get('refresh_token'))
          this.autoRefToken()
        } else {
          wx.showToast({
            title: '登录已过期，请重新登录',
            icon: 'none',
            duration: 1000
          })
        }
      }
    }

    retry () {
      if (!store.state.refreshToken) {
        this.failToReq()
      } else {
        if (this.time) {
          clearInterval(this.time)
        }
        this.autoRefToken()
      }
    }
    /**
     * 获取token
     * @param {*} userName
     * @param {*} passWord
     */
    async $getToken (userName, passWord) {
      this.refreshTimes = 0
      this.autoLoginTimes = 0
      // 先请求token
      try {
        await this._$reqToken(userName, passWord)
        // 暂存到vuex中，自动登录使用
        store.commit('updateUserAuthInfo', { userName, passWord })
        // 更新用户登录状态
        store.commit('changeUserAuthStatus', 'cn-north-3')
      } catch (error) {
        throw error
      }
      // 再自动刷新 token
      this.autoRefToken()
      return null
    }

    /**
     * 带用户名密码请求token
     * @param {*} userName
     * @param {*} password
     */
    _$reqToken (userName, password) {
      // let url = `${this.auth.authUrl}/realms/${this.auth.authRealm}/protocol/openid-connect/token`
      // let params = `grant_type=password&client_id=${encodeURIComponent(this.auth.authClientId)}&username=${userName}&password=${password}`
      let url = `${this.api}/miniapp/login/getToken`
      let params = { userName, password }

      // return fly.post(url, params, { ...this.httpOptions }).then(
      return fly.post(url, params).then(
        res => {
          // const data = res.data
          const data = res.data.result
          let today = new Date()
          today.setSeconds(today.getSeconds() + this.refreshExpiresTime)
          cookies.set('refresh_token', data.refresh_token, { domain: this.auth.domain, expires: today })
          cookies.set('inspur_token', data.access_token, { domain: this.auth.domain })

          store.commit('setTokenParsed', this.decodeToken(data.access_token))
          store.commit('setRefreshToken', data.refresh_token)

          let timeLocal = new Date().getTime()
          if (timeLocal) {
            this.timeSkew = Math.floor(timeLocal / 1000) - this.decodeToken(data.access_token).iat
          }
        }
      )
    }
    /** 自动刷新 token */
    autoRefToken () {
      this._$updateToken().then(
        next => {
          this.time = setInterval(() => {
            this._$updateToken().catch(
              () => {
                if (this.time) {
                  clearInterval(this.time)
                }
                this.failToReq()
              }
            )
          }, this.expiresTime)
        }
      ).catch(
        () => {
          if (this.time) {
            clearInterval(this.time)
          }
          this.failToReq()
        }
      )
    }
    /** 停止刷新token */
    stopRefToken () {
      if (this.time) {
        clearInterval(this.time)
      }
    }
    /** 刷新token */
    async _$updateToken () {
      // TODO: 一系列校验

      if (!store.state.refreshToken) {
        throw `未找到refreshToken`
      }
      try { // 失败重试
        await this._$refToken()
        this.refreshTimes = 0
        store.commit('changeUserAuthStatus', 'cn-north-3')
      } catch (error) {
        if (this.refreshTimes < 5) { // 失败重试5次
          this.refreshTimes++
          try {
            await this.sleep(this.refreshTimes * 0.5 * 1000)
            await this._$updateToken()
          } catch (error) {
            throw error
          }
        } else { // 重试5次仍失败
          throw `连续${this.refreshTimes}次刷新token失败`
        }
      }
    }
    /** 请求refreshToken */
    _$refToken () {
      let url = `${this.api}/miniapp/login/refreshToken`
      // let url = `${this.auth.authUrl}/realms/${this.auth.authRealm}/protocol/openid-connect/token`
      let refreshToken = store.state.refreshToken
      let params = {
        refresh_token: refreshToken
      }
      // `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=${encodeURIComponent(this.auth.authClientId)}`
      // return fly.post(url, params, { ...this.httpOptions }).then(
      return fly.post(url, params).then(
        res => {
          const data = res.data
          let today = new Date()
          today.setSeconds(today.getSeconds() + this.refreshExpiresTime)
          cookies.set('refresh_token', data.refresh_token, { domain: this.auth.domain, expires: today })
          cookies.set('inspur_token', data.access_token, { domain: this.auth.domain })

          store.commit('setTokenParsed', this.decodeToken(data.access_token))
          store.commit('setRefreshToken', data.refresh_token)
          let timeLocal = new Date().getTime()
          if (timeLocal) {
            this.timeSkew = Math.floor(timeLocal / 1000) - this.decodeToken(data.access_token).iat
          }
        }
      )
    }
    /** token 是否过期 */
    isTokenExpired (minValidity) {
      // if (!this.tokenParsed || !this.refreshToken) {
      //   throw 'Not authenticated'
      // }

      // if (this.timeSkew == null) {
      //   log(
      //     'Unable to determine if token is expired as timeskew is not set'
      //   )
      //   return true
      // }

      // let expiresIn =
      //   this.tokenParsed['exp'] -
      //   Math.ceil(new Date().getTime() / 1000) +
      //   this.timeSkew
      // if (minValidity) {
      //   expiresIn -= minValidity
      // }
      // return expiresIn < 0
    }
    /** 自动登录失败/刷新token失败 */
    failToReq () {
      this.logout()
    }
    /** 退出登录 */
    logout () {
      if (this.time) {
        clearInterval(this.time)
      }

      cookies.remove('refresh_token')
      cookies.remove('inspur_token')

      store.commit('setTokenParsed', null)
      store.commit('setRefreshToken', null)

      store.commit('changeUserAuthStatus', 'notauth')
      store.commit('updateUserAuthInfo', { userName: null, passWord: null })
    }

    /***********************************************************************************************************************************/
    /** ********************************************************** 辅助功能 *************************************************************/
    /***********************************************************************************************************************************/

    /** 解码 token */
    decodeToken (str) {
      str = str.split('.')[1]
      str = Base64.decode(str)
      str = JSON.parse(str)
      return str
    }

    /** 延时 */
    sleep (time) {
      return new Promise((resolve) => setTimeout(resolve, time))
    }
}
