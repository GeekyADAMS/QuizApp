import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    testDetails: {}
  },
  mutations: {
    saveTestDetails (state, val) {
      state.testDetails = val
    }
  },
  actions: {},
  modules: {}
})
