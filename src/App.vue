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
import Auth0 from 'auth0-js'
import Auth0Lock from 'auth0-lock'
import settings from 'settings'

export default {
  name: 'app',
  data () {
    return {
      auth0: null,
      authUser: null,
      isAuthenticated: false,
      lock: null
    }
  },
  watch: {
    isAuthenticated (n, o) {
      if (n !== o) {
        if (n) {
          console.info('Logged in as', (this.authUser || {}).nickname)
        } else {
          console.info('Logged out')
        }
      }
    }
  },
  methods: {
    setAuth () {
      this.isAuthenticated = !!localStorage.getItem(settings.authToken)
      try {
        this.authUser = JSON.parse(localStorage.getItem(settings.authProfile))
      } catch (e) {
        this.authUser = null
      }
    },
    getProfile () {
      const accessToken = localStorage.getItem(settings.authAccessToken)
      const token = localStorage.getItem(settings.authToken)
      if (!accessToken || !token) return

      this.lock.getUserInfo(accessToken, (err, profile) => {
        if (err) {
          console.info(err)
          return
        }
        localStorage.setItem(settings.authProfile, JSON.stringify(profile))
        this.setAuth()

        if (settings.firebase) {
          var options = {
            id_token: token,
            api: 'firebase',
            scope: 'openid name email displayName',
            target: settings.auth0.clientID
          }

          // Make a call to the Auth0 '/delegate'
          this.auth0.getDelegationToken(options, (err, result) => {
            if (!err) {
              // Exchange the delegate token for a Firebase auth token
              this.$firebase.auth().signInWithCustomToken(result.id_token).catch(console.error)
            }
          })
        }
      })
    },
    initializeAuth0 () {
      this.auth0 = new Auth0(settings.auth0)
      this.lock = new Auth0Lock(settings.auth0.clientID, settings.auth0.domain, {
        allowSignup: false,
        allowForgotPassword: false
      })

      // handle authenticated user
      this.lock.on('authenticated', authResult => {
        localStorage.setItem(settings.authAccessToken, authResult.accessToken)
        localStorage.setItem(settings.authToken, authResult.idToken)
        this.getProfile()
      })
    },
    login () {
      if (this.lock) this.lock.show()
    },
    logout () {
      this.$firebase.auth().signOut().then(() => {
        localStorage.clear()
        this.setAuth()
        this.$router.push('/')
      }).catch(console.error)
    }
  },
  mounted () {
    console.log('Running app in', settings.NODE_ENV)
    this.setAuth()
    if (settings.auth0) {
      this.initializeAuth0()
      if (this.isAuthenticated) {
        this.getProfile()
      }
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
