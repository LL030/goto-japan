import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"

import Vuex from 'vuex'
import store from '../../store/index.js'
import axios from 'axios'
Vue.prototype.$ajax = axios
Vue.use(Vuex);

Vue.use(VueRouter);

import Plans from './components/Plans.vue'

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/dashboard/plans',
      component: Plans
    }
  ]
})

var Main = window.Main = new Vue({
  router: router,
  store,
  render: h => h(App, {
      // props: {
      //   active: 'index'
      // }
  })
}).$mount('#app')
