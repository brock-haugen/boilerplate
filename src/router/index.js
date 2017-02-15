import Vue from 'vue'
import settings from 'settings'
import Router from 'vue-router'

Vue.use(Router)

const checkAuth = () => !!localStorage.getItem(settings.authItem)

import Hello from 'components/Hello'

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/hello',
      name: 'HelloPrivate',
      component: Hello,
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
