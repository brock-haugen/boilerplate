import Vue from 'vue'
import settings from 'settings'
import Router from 'vue-router'

Vue.use(Router)

const checkAuth = () => !!localStorage.getItem(settings.authToken)

import Home from {{#if_eq api "firebase"}}'views/FirebaseDemo'{{/if_eq}}{{#if_eq api "ajax"}}'views/Hello'{{/if_eq}}

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
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
