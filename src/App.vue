<template>
  <div id="app">
    <div class="block">
      <el-button v-if="!isAuthenticated" @click="login()">Login</el-button>
      <el-button v-else @click="logout()">Logout</el-button>
    </div>
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
import Auth0Lock from 'auth0-lock'
import settings from 'settings'

export default {
  name: 'app',
  data () {
    return {
      authUser: null,
      isAuthenticated: false,
      lock: null
    }
  },
  methods: {
    setAuth () {
      this.isAuthenticated = !!localStorage.getItem(settings.authItem)
      try {
        this.authUser = JSON.parse(localStorage.getItem(settings.authProfile))
      } catch (e) {
        this.authUser = null
      }
    },
    initializeAuth0 () {
      this.lock = new Auth0Lock(settings.auth0.clientID, settings.auth0.domain)
      // handle authenticated user
      this.lock.on('authenticated', authResult => {
        console.log('authenticated')
        localStorage.setItem(settings.authItem, authResult.idToken)
        this.setAuth()
        this.lock.getProfile(authResult.idToken, (err, profile) => {
          if (err) {
            console.info(err)
            return
          }
          localStorage.setItem(settings.authProfile, JSON.stringify(profile))
          this.setAuth()
        })
      })
      // handle error when authorizaton fails
      // this.lock.on('authorizaton_error', err => {
      //   console.info(err)
      // })
    },
    login () {
      if (this.lock) this.lock.show()
    },
    logout () {
      console.log('logging out')
      localStorage.clear()
      this.setAuth()
      this.$router.push('/')
    }
  },
  mounted () {
    console.log('Running app in', settings.NODE_ENV)
    this.setAuth()
    if (settings.auth0) {
      this.initializeAuth0()
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
