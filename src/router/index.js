import Vue from 'vue'
import settings from 'settings'
import Router from 'vue-router'

Vue.use(Router)

const checkAuth = () => !!localStorage.getItem(settings.authItem)

import FirebaseDemo from 'components/FirebaseDemo'
import Hello from 'components/Hello'

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/firebase-demo',
      name: 'FirebaseDemo',
      component: FirebaseDemo,
      meta: { private: true }
    },
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.private && !checkAuth()) {
    next('/')
  } else {
    next()
  }
})

export default router
