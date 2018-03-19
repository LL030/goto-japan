<template>
  <div id="loading">
    loading
  </div>
</template>

<script>
//import GoogleMap from '../plugin/GoogleMap.vue'
export default {
    /* eslint-disable no-undef */
    name:"loading",
    /*components: {
      'google-map': GoogleMap
    },*/
    data () {
        return {
          id:0,
        }
    },
    beforeCreate(){
    },
    destroyed(){
    },
    methods: {
    },
    mounted() {
    }
}

</script>

<style lang="scss">
  #svg{
    width: 60%;
    margin: 0 auto;
  }
</style>