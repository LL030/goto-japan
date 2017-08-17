import shop from '../../api/shop'
import * as types from '../mutation-types'

// initial state
const state = {
  all: []
}

// getters
const getters = {
  allPosts: state => state.all
}

// actions
const actions = {
  getAllPosts ({ commit }) {
    shop.getPosts(posts => {
      commit(types.RECEIVE_POSTS, { posts })
    })
  }
}

// mutations
const mutations = {
  [types.RECEIVE_POSTS] (state, { posts }) {
    state.all = posts
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
