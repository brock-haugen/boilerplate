<template>
  <div id='app'>
    <!-- header -->
    <div class='header'>
      <router-link to='/' class='home-link'>
        <img src='./assets/logo.png'>
        <h4>{{ name }}</h4>
      </router-link>{{#if auth0}}
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
      <el-button v-else @click='login()'>Login</el-button>{{/if}}
    </div>
    <!-- router view (content) -->
    {{#unless auth0}}<router-view></router-view>
    {{/unless}}{{#if auth0}}<div v-if='isAuthenticated && authUser'>
      <router-view></router-view>
    </div>
    <div v-else-if='isCheckingAuth'>
      Loading...
    </div>
    <div v-else>
      <h3 style='text-align: center;'>Welcome! Please <el-button type='text' @click='login()'><h3>login</h3></el-button></h3>
    </div>{{/if}}
  </div>
</template>

<script>
{{#if auth0}}import { mapActions, mapGetters } from 'vuex'
import Auth0 from 'auth0-js'
import Auth0Lock from 'auth0-lock'
{{/if}}import settings from 'settings'

export default {
  name: 'app',
  {{#if auth0}}data () {
    return {
      auth0: null,
      isCheckingAuth: true,
      lock: null
    }
  },
  computed: mapGetters([ 'authUser', 'isAuthenticated' ]),
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
    ...mapActions([ 'setAuthUser' ]),
    setAuth (payload) {
      if (payload) {
        localStorage.setItem(settings.authProfile, JSON.stringify(payload))
        this.setAuthUser(payload)
      } else {
        try {
          this.setAuthUser(JSON.parse(localStorage.getItem(settings.authProfile)))
        } catch (e) {
          this.setAuthUser(null)
        }
      }
    },
    getProfile () {
      const accessToken = localStorage.getItem(settings.authAccessToken)
      const token = localStorage.getItem(settings.authToken)
      if (!accessToken || !token) return

      this.lock.getUserInfo(accessToken, (err, profile) => {
        if (err) {
          console.info(err)
          this.logout()
          return
        }

        let payload = {
          email: profile.email,
          name: profile.name,
          nickname: profile.nickname,
          picture: profile.picture
        }{{#if_eq api "ajax"}}
        this.setAuth(payload){{/if_eq}}{{#if_eq api "firebase"}}

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
              this.$firebase.auth().signInWithCustomToken(result.id_token).catch(console.error).then(() => {
                const userRef = this.$db.ref('users/' + profile.user_id)
                userRef.once('value').then(snap => {
                  snap = snap.val()
                  if (!snap) {
                    userRef.set(payload)
                    this.setAuth(payload)
                  } else {
                    this.setAuth(snap)
                  }
                  userRef.on('value', snap => this.setAuth(snap.val()))
                })
              })
            } else {
              this.logout()
            }
          })
        }{{/if_eq}}
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
        this.isCheckingAuth = true
        localStorage.setItem(settings.authAccessToken, authResult.accessToken)
        localStorage.setItem(settings.authToken, authResult.idToken)
        this.getProfile()
      })
    },
    login () {
      if (this.lock) this.lock.show()
    },
    logout () {
      {{#if_eq api "firebase"}}this.$firebase.auth().signOut().then(() => {
        localStorage.clear()
        this.setAuth()
        this.$router.push('/')
        this.isCheckingAuth = false
      }).catch(console.error){{/if_eq}}{{#if_eq api "ajax"}}localStorage.clear()
      this.setAuth()
      this.$router.push('/'){{/if_eq}}
    }
  },
  {{/if}}mounted () {
    console.log('Running app in', settings.NODE_ENV){{#if auth0}}
    this.setAuth()
    if (settings.auth0) {
      this.initializeAuth0()
      if (this.isAuthenticated) {
        this.getProfile()
      } else {
        this.isCheckingAuth = false
      }
    }{{/if}}
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
.header .home-link {
  color: inherit;
  float: left;
  text-decoration: none;
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
{{#if auth0}}.header .el-dropdown-link {
  cursor: pointer;
}
{{/if}}</style>
