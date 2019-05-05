import Vue from "vue"
import vuex from 'vuex'
Vue.use(vuex)


import home_store from './home_store.js'
export default new vuex.Store({
  modules:{
    homestore:home_store
  }
})