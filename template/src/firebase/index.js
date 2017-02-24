import Vue from 'vue'
import VueFire from 'vuefire'

import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

import settings from 'settings'

let db = null

if (settings.firebase) {
  Vue.use(VueFire)
  const firebaseApp = firebase.initializeApp(settings.firebase)
  db = firebaseApp.database()
}

Vue.prototype.$firebase = firebase
Vue.prototype.$db = db

export default { db, firebase }
