import Vue from 'Vue'
import VueHead from 'vue-head'

Vue.use(VueHead)

export default {
  title: {
    inner: '{{ lowercase name }}'
  },
  link: [
    { rel: 'shortcut icon', href: require('../assets/logo.png') }
  ],
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' }
  ]
}
