import Vue from 'vue'
import Axios from 'axios'
import { ENV } from 'config'

Axios.defaults.baseURL = ENV.apiURL

Axios.interceptors.request.use(config => {
  config.headers['Authorization'] = 'token'
  return config
})

Vue.prototype.$ajax = Axios

export default Axios
