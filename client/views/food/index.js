import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import VueQuillEditor from 'vue-quill-editor'
import {load, loaded} from '../google_config.js';
//import { alert } from 'vue-strap'
import axios from 'axios'
Vue.prototype.$ajax = axios
//import BootstrapVue from 'bootstrap-vue';
import VueWaypoint from 'vue-waypoint'
import vuescroll from 'vue-scroll'

require("../common/common.scss");
require("../common/common.js");


Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);
Vue.use(VueQuillEditor);
//Vue.use(BootstrapVue);
Vue.use(VueWaypoint);
Vue.use(vuescroll)

import Home from '../components/common/Home.vue'
//import Test from './components/Test.vue'
import store from '../../store/index.js'
import { quillEditor } from 'vue-quill-editor'
import Schedule from '../components/common/Schedule.vue'
import Hotel from '../components/common/Hotel.vue'
import Food from '../components/common/Food.vue'

import GMap from '../components/plugin/GoogleMap.vue'
//import Blog from './components/article/Blog.vue'
//import BlogContent from './components/article/BlogContent.vue'

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
      component: Food
    },
    {
      path: '/food',
      component: Food
    }
  ]
})
var Main = window.Main = new Vue({
  router: router,
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  methods: {
      init: function(){
          this.$emit('create-map');
      }
  },
  render: h => h(App, {
      props: {
        active: 'food'
      }
    })
}).$mount('#app')
