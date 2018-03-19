<template>
<div id="schedule">
    <div class="map-container schedule-map" id="home-bg-map" style="position: absolute;z-index: 1;top:0;padding-bottom: 20px;height:100vh;background-image:linear-gradient(to right, rgba(0, 0, 0, 0.1),  rgba(0, 0, 0, 0.1)),url(http://www.pilakuma.com/jpt/src/assets/img/banner/京都.jpg);background-size: cover;overflow:hidden">
      <div class="falling-leaves"></div>
      <div v-bind:style="{width:'120%',height:'120%',transform:'rotate('+ mapRotate +'deg)'}">
      <GoogleMap :panTo='panTo' :id='id' :zoom='8' :center='center' :from='from' :to='to' :waypts='waypts' :markers='markers'></GoogleMap>
      </div>
    </div>
    <div class="station hidden-sm-down hidden-md-up">
      <div class="d-flex flex-wrap">
        <div class="col station-item">
          <span class="btn-radius small" id="gotokyo" data-point='0'>東京都</span>
        </div>
        <div class="col station-item hidden-sm-down">
          <span class="icon-arrow auto" ></span>
        </div>
        <div class="col station-item">
          <span class="btn-radius small" id="gokamakura" data-point='1'>湘南</span>
        </div>
        <div class="col station-item hidden-sm-down">
          <span class="icon-arrow auto" ></span>
        </div>
        <div class="col station-item">
          <span class="btn-radius small" id="gohakone" data-point='2'>箱根</span>
        </div>
        <div class="col station-item hidden-sm-down">
          <span class="icon-arrow auto" ></span>
        </div>
        <div class="col station-item">
          <span class="btn-radius small" id="gonagoya" data-point='3'>名古屋</span>
        </div>
        <div class="col station-item hidden-sm-down">
          <span class="icon-arrow auto" ></span>
        </div>
        <div class="col station-item">
          <span class="btn-radius small" id="gokyoto" data-point='4'>京都府</span>
        </div>
      </div>
    </div>
    <div class="">
      <div>
        <div class="content" id="content-schedule">
          <div id="timeline">
            <div class="section">
              <div class="inner-section-fixed">
                <i class="fixed-line">
                    <div class="timeline-icon">
                      <div class="start"></div>
                    </div>
                </i>
              </div>
            </div>
            <div class="section">
              <div class="inner-section-fixed">
                <div class="timeline-item">
                  <div class="timeline-icon">
                    <div class="start"></div>
                  </div>
                  <div class="timeline-content">
                    <h5 class="h5">Day1(0922) 東京都 - 淺草、上野</h5>
                    <p>
                      19:25 落機<br/>
                      20:30 Check In<br/>
                      21:00 晴空塔（8：00～22：00）-> 隅田川公園 <br/>
                      <!-- ふらっとQUSUMI -->
                    </p>
                    <div class="w-100 text-right">
                      <span class="btn"><router-link to="/plan/1">MORE</router-link></span>
                    </div>
                  </div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-icon">
                    <div class="start"></div>
                  </div>
                  <div class="timeline-content right">
                    <h5 class="h5">Day2(0923)  - 築地、台場、汐留</h5>
                    <p>
                       日比谷公園散步看楓葉，Caretta 45F 觀景。<br/>
                       築地市場新鮮海產 「築地站」，波除稻荷神社<br/>
                       月島漫步<br/>
                       台場高達，自由女神，睇彩虹橋<br/> 
                       大江戶溫泉物語<br/>
                    </p>
                    <div class="w-100 text-right">
                      <span class="btn"><router-link to="/plan/2">MORE</router-link></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="section">
              <div class="inner-section-fixed">
                <div class="timeline-item">
                  <div class="timeline-icon">
                    <div class="start"></div>
                  </div>
                  <div class="timeline-content">
                    <h5 class="h5">Day3(0924) 東京都 - 千葉 Game Show 秋葉原</h5>
                    <p>
                      上午 GameShow -> 千葉IBM附近小餐館 <br/>
                      下午&晚上 秋葉原 -> 神田万世橋 ->  電器街/UDX -> Yodobashi Akiba
                    </p>
                    <div class="w-100 text-right">
                      <span class="btn"><router-link to="/plan/3">MORE</router-link></span>
                    </div>
                  </div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-icon">
                    <div class="start"></div>
                  </div>
                  <div class="timeline-content right">
                    <h5 class="h5">Day4(0925) 東京都 - 三鷹、練馬區、中野區、池袋</h5>
                    <p>
                      吉卜力美術館 -> 中野區食烤肉 -> J-WorldJ-WORLD TOKYO<br/>
                    </p>
                    <div class="w-100 text-right">
                      <span class="btn"><router-link to="/plan/4">MORE</router-link></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="section">
              <div class="inner-section-fixed">
                <div class="timeline-item">
                  <div class="timeline-icon">
                    <div class="start"></div>
                  </div>
                  <div class="timeline-content">
                    <h5 class="h5">Day5(0926) 東京都 - 澀谷、目黑、君の名は</h5>
                    <p>
                      中目黑 -> 自由之丘 -> 澀谷101 -> 君の名は<br/>
                    </p>
                    <div class="w-100 text-right">
                      <span class="btn"><router-link to="/plan/5">MORE</router-link></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="section">
              <div class="inner-section-fixed">
                <div class="timeline-item">
                  <div class="timeline-icon">
                    <div class="start"></div>
                  </div>
                  <div class="timeline-content right">
                    <h5 class="h5">Day6(0927) 鎌倉市 - 湘南高校前、江之島</h5>
                    <p>
                       湘南高校前、江之島 <br/>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="section">
              <div class="inner-section-fixed">
                <div class="timeline-item">
                  <div class="timeline-icon">
                    <div class="start"></div>
                  </div>
                  <div class="timeline-content">
                    <h5 class="h5">Day7(0928) 箱根 - 溫泉、蘆之湖</h5>
                    <p>
                       宅酒店，嘆溫泉，湖中鳥居 <br/>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="section">
              <div class="inner-section-fixed">
                <div class="timeline-item">
                  <div class="timeline-icon">
                    <div class="start"></div>
                  </div>
                  <div class="timeline-content right">
                    <h5 class="h5">Day8(0929) 名古屋 - ？？？</h5>
                    <p>
                      大須う <br/>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="section">
              <div class="inner-section-fixed">
                <div class="timeline-item">
                  <div class="timeline-icon">
                    <div class="start"></div>
                  </div>
                  <div class="timeline-content">
                    <h5 class="h5">Day9(0930) 京都府 - ？？？</h5>
                    <p>
                      ？？？ <br/>
                    </p>
                  </div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-icon">
                    <div class="start"></div>
                  </div>
                  <div class="timeline-content right">
                    <h5 class="h5">Day10(1001) 京都府 - ？？？</h5>
                    <p>
                      ？？？ <br/>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="section">
              <div class="inner-section-fixed">
                <div class="timeline-item">
                  <div class="timeline-icon">
                    <div class="start"></div>
                  </div>
                  <div class="timeline-content">
                    <h5 class="h5">Day11(1002) 京都府 - ？？？</h5>
                    <p>
                      ？？？ <br/>
                    </p>
                  </div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-icon">
                    <div class="start"></div>
                  </div>
                  <div class="timeline-content right">
                    <h5 class="h5">Day12(1003) 東京 - 回程</h5>
                    <p>
                      ？？？ <br/>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
//import GoogleMap from '../plugin/GoogleMap.vue'
export default {
    /* eslint-disable no-undef */
    name:"schedule",
    /*components: {
      'google-map': GoogleMap
    },*/
    data () {
        return {
          id:0,
          from:'東京',
          to:'京都',
          waypts:[{location:'湘南',stopover:true},{location:'箱根',stopover:true},{location:'名古屋',stopover:true}],
          center: {lat: 35.10000, lng: 138.10000},
          markers: [
            {
              loc:{lat:35.709026,lng:139.731992},
              title:'東京'
            },
            {
              loc:{lat:35.352376,lng:139.383201},
              title:'湘南',
            },
            {
              loc:{lat:35.250817,lng:139.047959},
              title:'箱根',
            },
            {
              loc:{lat:35.181446,lng:136.906398},
              title:'名古屋'
            },
            {
              loc:{lat:35.011636,lng:135.768029},
              title:'京都'
            }
          ],
          backgroundColor:'hsla(0, 0%, 0%, 0)',
          zoom:19,
          mapRotate:-30,
          windowWidth:0,
          windowHeight:0,
          panTo:null
        }
    },
    beforeCreate(){
      if($('.plan-back').length>0){
        $('.plan-back').remove();
      }
      if ($( 'html' ).hasClass( 'fp-enabled' ) ) {
        $.fn.fullpage.destroy('all');
      }
    },
    destroyed(){
    },
    methods: {
      getWindowSize(event) {
        console.log('a')
        this.windowWidth = document.documentElement.clientWidth;
        this.windowHeight = document.documentElement.clientHeight;
        this.mapRotate = (document.documentElement.clientWidth/document.documentElement.clientHeight)*90 - 20;
      },
      setPanTo(index){
        console.log(index);
        var pan = [0,0,0,0,0,1,2,3,4,4];
        if(index > 1){
          this.panTo = {location:this.markers[pan[index]]['loc']};
        }else{
          this.panTo = {location:this.center};
        }
      }
    },
    mounted() {
      //window.addEventListener('resize', this.getWindowSize);
      var self = this;
      $('#schedule').fullpage({
        menu: '#menu',
        scrollingSpeed: 1000,
        scrollOverflow: true,
        navigation: true,
        normalScrollElements:'.normal-scroll',
        fixedElements:'.schedule-map',
        afterLoad: function(anchorLink, index){
          var loadedSection = $(this);
          self.setPanTo(index);
        }
      });
      $.fn.fullpage.reBuild();
      var LeafScene = function(el) {
          this.viewport = el;
          this.world = document.createElement('div');
          this.leaves = [];

          this.options = {
            numLeaves: 20,
            wind: {
              magnitude: 1.2,
              maxSpeed: 6,
              duration: 300,
              start: 0,
              speed: 0
            },
          };

          this.width = this.viewport.offsetWidth;
          this.height = this.viewport.offsetHeight;

          // animation helper
          this.timer = 0;

          this._resetLeaf = function(leaf) {

            // place leaf towards the top left
            leaf.x = this.width * 2 - Math.random()*this.width*1.75;
            leaf.y = -10;
            leaf.z = Math.random()*200;
            if (leaf.x > this.width) {
              leaf.x = this.width + 10;
              leaf.y = Math.random()*this.height/2;
            }
            // at the start, the leaf can be anywhere
            if (this.timer == 0) {
              leaf.y = Math.random()*this.height;
            }

            // Choose axis of rotation.
            // If axis is not X, chose a random static x-rotation for greater variability
            leaf.rotation.speed = Math.random()*10;
            var randomAxis = Math.random();
            if (randomAxis > 0.5) {
              leaf.rotation.axis = 'X';
            } else if (randomAxis > 0.25) {
              leaf.rotation.axis = 'Y';
              leaf.rotation.x = Math.random()*180 + 90;
            } else {
              leaf.rotation.axis = 'Z';
              leaf.rotation.x = Math.random()*360 - 180;
              // looks weird if the rotation is too fast around this axis
              leaf.rotation.speed = Math.random()*3;
            }

            // random speed
            leaf.xSpeedVariation = Math.random() * 0.8 - 0.4;
            leaf.ySpeed = Math.random() + 1.5;

            return leaf;
          }

          this._updateLeaf = function(leaf) {
            var leafWindSpeed = this.options.wind.speed(this.timer - this.options.wind.start, leaf.y);

            var xSpeed = leafWindSpeed + leaf.xSpeedVariation;
            leaf.x -= xSpeed;
            leaf.y += leaf.ySpeed;
            leaf.rotation.value += leaf.rotation.speed;

            var t = 'translateX( ' + leaf.x + 'px ) translateY( ' + leaf.y + 'px ) translateZ( ' + leaf.z + 'px )  rotate' + leaf.rotation.axis + '( ' + leaf.rotation.value + 'deg )';
            if (leaf.rotation.axis !== 'X') {
              t += ' rotateX(' + leaf.rotation.x + 'deg)';
            }
            leaf.el.style.webkitTransform = t;
            leaf.el.style.MozTransform = t;
            leaf.el.style.oTransform = t;
            leaf.el.style.transform = t;

            // reset if out of view
            if (leaf.x < -10 || leaf.y > this.height + 10) {
              this._resetLeaf(leaf);
            }
          }

          this._updateWind = function() {
            // wind follows a sine curve: asin(b*time + c) + a
            // where a = wind magnitude as a function of leaf position, b = wind.duration, c = offset
            // wind duration should be related to wind magnitude, e.g. higher windspeed means longer gust duration

            if (this.timer === 0 || this.timer > (this.options.wind.start + this.options.wind.duration)) {

              this.options.wind.magnitude = Math.random() * this.options.wind.maxSpeed;
              this.options.wind.duration = this.options.wind.magnitude * 50 + (Math.random() * 20 - 10);
              this.options.wind.start = this.timer;

              var screenHeight = this.height;

              this.options.wind.speed = function(t, y) {
                // should go from full wind speed at the top, to 1/2 speed at the bottom, using leaf Y
                var a = this.magnitude/2 * (screenHeight - 2*y/3)/screenHeight;
                return a * Math.sin(2*Math.PI/this.duration * t + (3 * Math.PI/2)) + a;
              }
            }
          }
        }

      LeafScene.prototype.init = function() {

        for (var i = 0; i < this.options.numLeaves; i++) {
          var leaf = {
            el: document.createElement('div'),
            x: 0,
            y: 0,
            z: 0,
            rotation: {
              axis: 'X',
              value: 0,
              speed: 0,
              x: 0
            },
            xSpeedVariation: 0,
            ySpeed: 0,
            path: {
              type: 1,
              start: 0,

            },
            image: 1
          };
          this._resetLeaf(leaf);
          this.leaves.push(leaf);
          this.world.appendChild(leaf.el);
        }

        this.world.className = 'leaf-scene';
        this.viewport.appendChild(this.world);

        // set perspective
        this.world.style.webkitPerspective = "400px";
        this.world.style.MozPerspective = "400px";
        this.world.style.oPerspective = "400px";
        this.world.style.perspective = "400px";
        
        // reset window height/width on resize
        var self = this;
      }

      LeafScene.prototype.render = function() {
        this._updateWind();
        for (var i = 0; i < this.leaves.length; i++) {
          this._updateLeaf(this.leaves[i]);
        }

        this.timer++;

        requestAnimationFrame(this.render.bind(this));
      }

      // start up leaf scene
      var leafContainer = document.querySelector('.falling-leaves'),
          leaves = new LeafScene(leafContainer);

      leaves.init();
      leaves.render();
    }
}

</script>

<style lang="scss">
#home-bg-map{
  &:before{
    content:'';
    width: 100%;
    height:100%;
    z-index: 9;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.1);
  }
}
#schedule{
  position: relative;
  z-index: 2;
  #timeline{
    &:before{
      content: "";
      top:70vh!important;
      //display: none;
    }
  }
  .section{
    .timeline-item{
      //height: 40vh;
    }
    .inner-section-fixed{
      // position:absolute;
      // top:40px;
      // left:0;
      padding-top: 100px;
      width:100%;
      min-height:100%;
      height:auto;
    }
  }
}
.falling-leaves {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, 0);
  z-index: 9;
  border-radius: 50px;
  background-size: cover;
  overflow: hidden;
}

.leaf-scene {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
      z-index: 9;
    transform-style: preserve-3d;

    div {
      position: absolute;
      top: 0;
      left: 0;
      width: 20px;
      height: 20px;
      z-index: 9;
      background: url(https://image.flaticon.com/icons/svg/234/234908.svg) no-repeat;
      background-size: 100%;
      transform-style: preserve-3d;
      backface-visibility: visible;
      opacity: 0.9;
    }
}
</style>