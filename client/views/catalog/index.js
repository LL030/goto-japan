import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import VueResource from 'vue-resource'
import {load, loaded} from './google_config.js';
//import { alert } from 'vue-strap'
import axios from 'axios'
Vue.prototype.$ajax = axios
//import BootstrapVue from 'bootstrap-

require("../common/common.scss");
require("../common/common.js");


Vue.use(VueRouter);
Vue.use(VueResource);

import Schedule from '../components/common/Schedule.vue'
import Hotel from '../components/common/Hotel.vue'
import GMap from '../components/plugin/GoogleMap.vue'

export {load, loaded,GMap};
load('AIzaSyCVw1_JjXxdPMjZPluDqsXrVQV0AuaGRsU');

Vue.component('GoogleMap', GMap);

const router = new VueRouter({
  mode: 'history',
  abstract: true,
  base: __dirname,
  routes: [
    {
      path: '/',
      component: Schedule
    },
    {
      path: '/hotel',
      component: Schedule
    },
    {
      path: '/test',
      component: Schedule
    }
  ]
})

var Main = window.Main = new Vue({
  router: router,
  methods: {
      init: function(){
          this.$emit('create-map');
      }
  },
  render: h => h(App, {
      props: {
        active: 'index'
      }
    })
}).$mount('#app')
