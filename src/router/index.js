import Vue from 'vue'
import settings from 'settings'
import Router from 'vue-router'

Vue.use(Router)

const checkAuth = () => !!localStorage.getItem(settings.authToken)

import FirebaseDemo from 'components/FirebaseDemo'

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'FirebaseDemo',
      component: FirebaseDemo
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
