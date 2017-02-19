import Vue from 'vue'
import Axios from 'axios'
import settings from 'settings'

Axios.defaults.baseURL = settings.apiURL

Axios.interceptors.request.use(config => {
  config.headers['Authorization'] = 'Bearer ' + localStorage.getItem(settings.authToken)
  return config
})

Vue.prototype.$http = Axios

global.API = Axios
export default Axios
