import shop from '../../api/shop'
import * as types from '../mutation-types'


// root state object.
// each Vuex instance is just a single state tree.
const state = {
  result:{
    html:'What news Today ?'
  }
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  insertHtml (state, data ) {
    console.log(typeof(data))
    console.log(data)
    state.result = data
  },
}

// actions are functions that causes side effects and can involve
// asynchronous operations.

const actions = {
  insertHtml ({ commit, state }, data) {
    commit('insertHtml',data)
  }
}
// getters are functions
const getters = {
  html: state => {
      return state.result
    }
}


export default {
  state,
  getters,
  actions,
  mutations
}
