import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import cart from './modules/cart'
import count from './modules/count'
import editor from './modules/editor'
import blog from './modules/blog'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    blog,
    editor,
    count
  }
})
