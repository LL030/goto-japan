<template>
  <div id="app">
    <div class="container-fullscreen">
    <header class="hidden-md-up- hidden-sm-down-">
      <div class="d-flex flex-wrap h-100 ml-auto" style="width: 300px;">
        <nav class="align-items-center d-flex justify-content-end ml-auto">
          <div class="nav-item">
            <a v-bind:class="{'active':active == 'index'}" href="/">行程</a>
          </div>
          <div class="nav-item">
            <a v-bind:class="{'active':active == 'hotel'}" href="/hotel">住宿</a>
          </div>
          <div class="nav-item">
            <a v-bind:class="{'active':active == 'food'}" href="/food">美食</a>
          </div>
        </nav>
      </div>
    </header>
    <router-view class="view"></router-view>
  </div>
</div>
</template>
<script>
//import 'bootstrap/dist/css/bootstrap.css'
import '../common/css/bootstrap/bootstrap.scss'
export default {
  name: 'app',
  props: ['active'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      map: null
    }
  }
}
</script>
<style lang="scss">
</style>
