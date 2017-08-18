<template>
  <div id="home">
    <div class="box-card">
      <div slot="header" class="clearfix">
      </div>
      <div class="bg-primary">
        <br/>
        <h1 ref="subtitle">{{ title }} </h1>
        <br/>
      </div>
      <div  >
        {{$store.state.editor.result.html}}
        <div v-for="p in posts">
            {{ p.title }}}
            <hr/>
            <!-- <div v-html="$store.state.editor.result.html" ></div> -->
            <hr/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      title: "Test",
    }
  },
  computed: mapGetters({
    posts: 'allPosts'
  }),
  methods: {
  },
  created () {
    this.$store.dispatch('getAllPosts')
  }
}

</script>

<style lang="scss">
</style>