import Vue from 'vue'
import head from './head'
import router from './router'
import store from './store'

import {{#if_eq api "firebase"}}'./firebase'{{/if_eq}}{{#if_eq api "ajax"}}'./api'{{/if_eq}}

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI, { locale })

import App from './App'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  head,
  router,
  store,
  template: '<App />',
  components: { App }
})
