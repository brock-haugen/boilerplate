import Vue from 'vue'
import App from './App'
import './api'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI, { locale })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuex: store,
  template: '<App/>',
  components: { App }
})
