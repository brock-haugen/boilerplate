import Vue from 'vue'
import App from './App'
import './api'
import router from './router'
import store from './store'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuex: store,
  template: '<App/>',
  components: { App }
})
