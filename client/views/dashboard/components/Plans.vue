<template>
  <div id="plans">
    <div class="container">
      <div class="card">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>name</th>
              <th>excerpt</th>
              <th>content</th>
              <th>thumbnail</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(p, key) in plans" :key="p.id" class="plans-block">
                <th scope="row">{{key}}</th>
                <td>{{p.plan_name}}</td>
                <td>{{p.plan_excerpt}}</td>
                <td>{{p.plan_content}}</td>
                <td>{{p.plan_thumbnail}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'plans',
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
  computed: mapGetters({
    plans: 'allPlans'
  }),
  created () {
    this.$store.dispatch('getAllPlans')
  }
}
</script>
<style lang="scss">
</style>
