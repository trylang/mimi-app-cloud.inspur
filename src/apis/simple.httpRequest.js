/* eslint-disable no-unused-vars */
import Fly from 'flyio/dist/npm/wx'

var fly = new Fly()

fly.interceptors.request.use(request => {
  wx.showLoading({ title: '加载中...' })
  return request
})

fly.interceptors.response.use(response => {
  wx.hideLoading()
  return response.data ? response.data : response
}, err => {
  wx.hideLoading()
  if (err.status === 0) {
    wx.showToast({
      title: '网络连接失败',
      icon: 'none',
      duration: 3000
    })
  } else if (err.status === 1) {
    wx.showToast({
      title: '请求超时',
      icon: 'none',
      duration: 3000
    })
  } else {
    let title = (err.response && err.response.data && err.response.data.message) ? err.response.data.message : err.message
    wx.showToast({
      title,
      icon: 'none',
      duration: 1000
    })
  }
})

// 设置超时
fly.config.timeout = 5 * 60 * 1000

export default fly
