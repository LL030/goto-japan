<template>
    <div class="d-flex flex-wrap">
      <div v-show="bkey%2 == 0" class="col-sm-2 ml-auto tree">
        <div class="ht-point ml-auto mr-auto">
          <i class="fa fa-circle" aria-hidden="true" v-bind:class="{'green':pointOnSelected == bkey}">
            <span class="right-date">{{post.date.slice(0, 10)}}</span>
          </i>
          <hr class="ml-auto fade" v-bind:class="{'show':hidden == false,'out':hidden == true}"/>
        </div>
      </div>
      <div class="col-sm-5 box fade"  v-bind:class="{'bd-l':bkey%2 == 0,'bd-r':bkey%2 !== 0,'show':hidden == false,'out':hidden == true}">
        <v-waypoint class="vue-waypoint" @waypoint-in="inHandler()" @waypoint-out="outHandler()" @waypoint="waypointHandler"></v-waypoint>
        <div class="row" >
          <div class="post-title col-12" v-bind:class="{'text-left':bkey%2 == 0,'text-right':bkey%2 !== 0}">
            {{post.title}}
          </div>
          <article class="content mt-3 mb-1 col-12" v-bind:class="{'mr-auto text-left':bkey%2 == 0,'ml-auto text-right':bkey%2 !== 0}">
            <div class="post-conter">{{post.content}}</div>
            
          </article>
        </div>
      </div>
      <div v-show="bkey%2 !== 0" class="col-sm-2 mr-auto tree">
        <div class="ht-point ml-auto mr-auto">
          <i class="fa fa-circle" aria-hidden="true" v-bind:class="{'green':pointOnSelected == bkey}">
            <span class="left-date">{{post.date.slice(0, 10)}}</span>
          </i>
          <hr class="mr-auto fade" v-bind:class="{'show':hidden == false,'out':hidden == true}" />
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default: {}
    },
    bkey:{
      type: Number,
      default: 0
    },
    pointOnSelected:{
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      hidden: true,
      pointStatus:'in'
    }
  },
  methods: {
    inHandler () {
      this.hidden = false;
    },
    outHandler () {
      this.hidden = true
    },
    hdPointInHandler(bkey,date){
      this.pointOnSelected = bkey;
      this.pointStatus = 'in';
      console.log(date+'in');
    },
    hdPointOutHandler(bkey,date){
      this.pointOnSelected = bkey;
      this.pointStatus = 'out';
      console.log(date+'out');
    },
    waypointHandler(direction, going){
    }
  }
}
</script>

<style lang="scss">
.fade {
  opacity: 0;
  -webkit-transition: opacity 0.5s linear;
  -o-transition: opacity 0.5s linear;
  transition: opacity 0.5s linear;
}
.tree{
  padding: 20px 0px 0px 0px;
  background: linear-gradient(
  to right, 
  transparent 0%, 
  transparent calc(50% - 1.21px), 
  #bbb calc(50% - 1.2px), 
  #bbb calc(50% + 0.7px), 
  transparent calc(50% + 0.71px), 
  transparent 100%);
}
#blog{
  font-size: 12px;
  color:#666;
  .post-title{
    font-size: 14px;
  }
  hr{
    margin: 0;
    margin-top: -7px;
    width: 50%;
    color: #bbb;
    border-top: 2px solid #bbb;
  }
  .box{
    border-color: #bbb;
    margin-top: 20px;
    position: relative;
    .vue-waypoint{
      position: absolute;
      top:20vh;
    }
    &.bd-l{
      border-left-width: 2px;
      border-left-style: solid;
    }
    &.bd-r{
      border-right-width: 2px;
      border-right-style: solid;
    }
    article.content {
      max-height: 120px;
      overflow-y: hidden;
      position: relative;
      &::after{
        content: '';
        position: absolute;
        bottom: 0;
        left:0;
        background: rgba(255,255,255,0.5);  
        background: linear-gradient(
                    to bottom, 
                    transparent 0%, 
                    rgba(255,255,255,.7) 100%); 
        width: 100%;
        height: 30px;
      }
    }
  }
  .ht-point{
    line-height: 0;
    margin-top: 5px;
    .fa{
      font-size: 12px;
      color:#bbb;
      position: relative;
      &.green{
        color:green;
      }
      span{
        position: absolute;
        width: 90px;
        text-align: center;
        font-weight: bold;
        top: 0;
        &.right-date{
          right: 10px;
        }
        &.left-date{
          left: 10px;
        }
      }
    }
  }
}
</style>