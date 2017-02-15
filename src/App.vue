<template>
  <div id='app'>
    <!-- header -->
    <div class='header'>
      <div style='float: left'>
        <img src='./assets/logo.png'>
        <h4>boilerplate</h4>
      </div>
      <!-- user dropdown -->
      <el-dropdown v-if='isAuthenticated && authUser' trigger='click'>
        <span class='el-dropdown-link'>
          <img :src='authUser.picture'>&nbsp;
          <h4 v-text='authUser.nickname'></h4>
          <i class='el-icon-caret-bottom el-icon--right'></i>
        </span>
        <el-dropdown-menu slot='dropdown'>
          <el-dropdown-item><span @click='logout()'>Logout</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- else show login button -->
      <el-button v-else @click='login()'>Login</el-button>
    </div>
    <!-- router view (content) -->
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
        console.log('authenticated with Auth0')
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
body {
  color: #2c3e50;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

#app {
  margin-top: 60px;
  padding: 1em;
  position: relative;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.header {
  background-color: white;
  border-bottom: solid 1px #ddd;
  height: 60px;
  left: 0;
  line-height: 60px;
  padding: 0 1em;
  position: fixed;
  right: 0;
  text-align: right;
  top: 0;
}
.header img {
  border-radius: 50%;
  height: 30px;
  width: 30px;
  vertical-align: middle;
}
.header h4 {
  display: inline-block;
  margin: 0;
}
</style>
