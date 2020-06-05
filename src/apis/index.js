import { api } from './api'

export default {
  install: (Vue, name = '$http') => {
    Object.defineProperty(Vue.prototype, name, { value: api })
  }
}
