<template>
  <div id="blog">
    <div class="container">
      <div class="mb-5">
      <h4>{{$store.state.editor.result.html}}</h4>
      </div>
      <div>
        <div v-for="(p, key) in posts" :key="p.id" class="post-block">
            <div v-if="p.type == 'post'">
              <v-waypoint class="vue-waypoint-select" @waypoint-in="hdPointInHandler(key)" @waypoint-out="hdPointOutHandler(key)"></v-waypoint>
              <blog-content :post='p' :bkey='key' :pointOnSelected='pointOnSelected'></blog-content>
            </div>
        </div>
      </div>
      <h2>aaa</h2>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Content from './BlogContent.vue'
export default {
  name:"blog",
  components: {
    'blog-content': Content
  },
  data() {
    return {
      title: "Blog",
      pointOnSelected:1
    }
  },
  computed: mapGetters({
    posts: 'allPosts'
  }),
  methods: {
    hdPointInHandler(key){
      this.pointOnSelected = key;
      this.pointStatus = 'in';
      console.log(document.body.scrollTop);
    },
    hdPointOutHandler(key){
      this.pointOnSelected = key;
      this.pointStatus = 'out';
    }
  },
  created () {
    this.$store.dispatch('getAllPosts')
  }
}

</script>

<style lang="scss">
#blog{
  font-size: 12px;
  color:#666;
  .post-block{
    position: relative;
    .vue-waypoint-select{
      position: absolute;
      top:55vh;
    }
  }
}
</style>