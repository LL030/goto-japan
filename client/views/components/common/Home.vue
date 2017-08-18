<template>
  <div id="home">
    <div class="box-card">
      <div slot="header" class="clearfix">
      </div>
      <br/>
      <Blog></Blog>
      <!-- bidirectional data binding（双向数据绑定） -->
      <div class="hidden">
        <quill-editor v-model="content"
                      ref="myQuillEditor"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)"
                      @change="onEditorChange($event)">
        </quill-editor> 
      </div>
        <!-- Or manually control the data synchronization（或手动控制数据流） -->
      <!-- <quill-editor :content="content"
                    :options="editorOption"
                    @change="onEditorChange($event)">
      </quill-editor>-->
      <div v-if="$store.state.editor.result.text&&$store.state.editor.result.text.length>1" >
        {{$store.state.editor.result.text.length}}
        <div v-html="$store.state.editor.result.html" ></div>
      </div>
    </div>

  </div>
</template>

<script>
import Blog from '../article/Blog.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
    data () {
      return {
        content: '<h2>I am Example</h2>',
        editorOption: {
          // some quill options
        }
      }
    },
    components:{
      Blog
    },
    // if you need to manually control the data synchronization, parent component needs to explicitly emit an event instead of relying on implicit binding
    // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
    methods: {
      onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
      onEditorChange({ editor, html, text }) {
        console.log('editor change!', editor, html, text)
        this.content = html
      },
      ...mapActions({
        onEditorChange: 'insertHtml' // 映射 this.add() 为 this.$store.dispatch('increment')
      })
    },
    // get the current quill instace object.
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    mounted() {
      // you can use current editor object to do something(quill methods)
      console.log('this is current quill instance object', this.editor)
    }
}

</script>

<style lang="scss">
</style>