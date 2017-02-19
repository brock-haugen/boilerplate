import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  authUser: null
}

const getters = {
  authUser: state => state.authUser,
  isAuthenticated: state => !!state.authUser
}

const mutations = {
  setAuthUser (state, payload) {
    state.authUser = payload
  }
}

const actions = {
  setAuthUser ({ commit }, payload) {
    commit('setAuthUser', payload)
  }
}

export default new Vuex.Store({
  actions,
  getters,
  mutations,
  state
})
