import Vue from 'vue'
import App from './App.vue'
import {load, loaded} from '../google_config.js';
import VueRouter from "vue-router"

require("../common/common.scss");
require("../common/common.js");


import GMap from '../components/plugin/GoogleMap.vue'

export {load, loaded,GMap};
load('AIzaSyCVw1_JjXxdPMjZPluDqsXrVQV0AuaGRsU','v=3.exp');

Vue.component('GoogleMap', GMap);

Vue.use(VueRouter);

import Schedule from '../components/common/Schedule.vue'
import Plan from '../components/common/Plan.vue'

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: Schedule
    },
    {
      path: '/plan/:day',
      component: Plan, 
      props: true
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
