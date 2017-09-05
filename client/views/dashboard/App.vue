<template>
  <div id="app">
    <div class="container-fullscreen">
    <header class="hidden-md-up- hidden-sm-down-" style="height: 30px;width:100%">
        <nav class="d-flex flex-wrap h-100 align-items-center">
          <div class="nav-item  mr-auto">
            <a v-bind:class=""><router-link to="/dashboard/plans">Plan</router-link></a>
          </div>
        </nav>
    </header>
    <div>
        <router-view class="view"></router-view>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'app',
  // props: ['active'],
  // components:{
  //   schedule:Schedule
  // },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      map: null,
    }
  },
  mounted() {
  }
}
</script>
<style lang="scss">
</style>
