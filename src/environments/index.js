/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

/** mock */
const local_environment = {
  authUrl: 'https://iopdev.10.110.25.123.xip.io/auth',
  authRealm: 'picp',
  authClientId: 'console',
  domain: '.cloud.inspur.com',
  api: 'http://10.221.2.6.xip.io:9080',
  news: 'http://117.50.42.181',
  newsImage: 'http://117.50.42.181',
  assets: 'http://10.221.2.4.xip.io:9080/miniapp/assets'
}
/** 敏捷 */
const dev_environment = {
  authUrl: 'https://iopdev.10.110.25.123.xip.io/auth',
  authRealm: 'picp',
  authClientId: 'console',
  domain: '.cloud.inspur.com',
  api: 'https://smart-cloud.mynatapp.cc',
  news: 'http://117.50.42.181',
  newsImage: 'http://117.50.42.181',
  assets: 'http://10.221.2.4.xip.io:9080/miniapp/assets'
}
/** 准生产 */
const app_environment = {
  authUrl: 'https://iopdev.10.110.25.123.xip.io/auth', // kk认证
  authRealm: 'picp', // kk认证
  authClientId: 'console', // kk认证
  domain: '.cloud.inspur.com', // cookie域
  api: 'https://smart-cloud.mynatapp.cc', // 后台接口
  news: 'https://m.cloud.inspur.com',
  newsImage: 'https://cloud.inspur.com',
  assets: 'http://117.73.2.112.xip.io:9080/miniapp/assets' // 静态资源
}
/** 测试 */
const test_environment = {
  authUrl: 'https://iopdev.10.110.25.123.xip.io/auth',
  authRealm: 'picp',
  authClientId: 'console',
  domain: '.cloud.inspur.com',
  api: 'https://smart-cloud.mynatapp.cc',
  news: 'https://m.cloud.inspur.com',
  newsImage: 'https://cloud.inspur.com',
  assets: 'http://smart-shore.natapp1.cc/miniapp/assets' // 静态资源
}
/** 生产 */
const prod_environment = {
  authUrl: 'https://auth1.cloud.inspur.com/auth',
  authRealm: 'picp',
  authClientId: 'console',
  domain: '.cloud.inspur.com',
  api: 'https://bssapi.cloud.inspur.com',
  news: 'https://m.cloud.inspur.com',
  newsImage: 'https://cloud.inspur.com',
  assets: 'https://bss.cloud.inspur.com//miniapp/assets'
}

const environment = local_environment

export { environment }
