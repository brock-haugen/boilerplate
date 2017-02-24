import Vue from 'vue'
import router from './router'
{{#if_eq api "ajax"}}import store from './store'
{{/if_eq}}
import {{#if_eq api "firebase"}}'./firebase'{{/if_eq}}{{#if_eq api "ajax"}}'./api'{{/if_eq}}

import VueHead from 'vue-head'
Vue.use(VueHead)

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI, { locale })

{{#if auth0}}import AuthMixin from 'mixins/auth'
Vue.mixin(AuthMixin)

{{/if}}import App from './App'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  head: {
    title () {
      return {
        inner: '{{ name }}',
        separator: '|',
        complement: [this.$route.name].concat(Object.values(this.$route.params))
      }
    },
    link: [
      { rel: 'shortcut icon', href: require('./assets/logo.png') }
    ],
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' }
    ]
  },
  router,
  {{#if_eq api "ajax"}}store,
  {{/if_eq}}template: '<App />',
  components: { App },
  watch: {
    $route (n, o) {
      this.$emit('updateHead')
    }
  }
})
