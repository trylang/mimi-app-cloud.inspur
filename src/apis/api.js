import homeApi from './service/home.service'
import controlApi from './service/control.service'
import userApi from './service/user.service'

export const api = {
  // 公共模块， this.$http.checkToken(param)
  ...homeApi,
  ...controlApi,
  ...userApi
}
