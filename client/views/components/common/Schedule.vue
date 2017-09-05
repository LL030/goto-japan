<template>
<div id="schedule">
    <div class="map-container schedule-map" style="position: absolute;z-index: 1;top:0;padding-bottom: 20px;height:100vh;background-image:linear-gradient(to right, rgba(0, 0, 0, 0.2),  rgba(0, 0, 0, 0.1)),url(http://feversoul.com/jp/src/assets/img/banner/京都.jpg);background-size: cover;">
      <GoogleMap :id='id' :center='center' :styles='styles' :from='from' :to='to' :waypts='waypts' :markers='markers'></GoogleMap>
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
                       築地市場新鮮海產 「築地站」，波除稻荷神社OR本願寺參觀<br/>
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
                    <h5 class="h5">Day3(0924) 東京都 - 千葉 Game Show</h5>
                    <p>
                      上午下午 千葉 -> GameShow -> <br/>
                      下午 選項1 水鄉佐原 ； 選項2 勝浦 ； 選項3 秋葉原
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
                    <h5 class="h5">Day4(0925) 東京都 - 三鷹、練馬區、中野區</h5>
                    <p>
                      雷門 -> 仲見世通 -> 淺草神社 <br/>
                      吉卜力美術館 -> 中野區食烤肉 ->新宿逛街<br/>
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
                    <h5 class="h5">Day5(0926) 東京都 - 新宿、澀谷、目黑</h5>
                    <p>
                      澀谷101 <br/>
                    </p>
                  </div>
                </div>
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
          center: {lat: 35.7075734, lng: 139.7320827},
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
              loc:{lat:35.181446,lng:136.906398},
              title:'名古屋'
            },
            {
              loc:{lat:35.011636,lng:135.768029},
              title:'京都'
            }
          ],
          styles:[
              {
                  "featureType": "all",
                  "elementType": "all",
                  "stylers": [
                      {
                          "visibility": "on"
                      }
                  ]
              },
              {
                  "featureType": "all",
                  "elementType": "labels.icon",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "administrative",
                  "elementType": "all",
                  "stylers": [
                      {
                          "visibility": "on"
                      }
                  ]
              },
              {
                  "featureType": "administrative",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "visibility": "on"
                      },
                      {
                          "color": "#000000"
                      },
                      {
                          "lightness": 20
                      }
                  ]
              },
              {
                  "featureType": "administrative",
                  "elementType": "all",
                  "stylers": [
                      {
                          "visibility": "on"
                      },
                      {
                          "color": "#000000"
                      },
                      {
                          "lightness": 17
                      },
                      {
                          "weight": 1.2
                      }
                  ]
              },
              {
                  "featureType": "administrative.province",
                  "elementType": "all",
                  "stylers": [
                      {
                          "visibility": "on"
                      },
                      {
                          "color": "#CDDC39"
                      }
                  ]
              },
              {
                  "featureType": "administrative.locality",
                  "elementType": "labels.text.fill",
                  "stylers": [
                      {
                          "visibility": "on"
                      },
                      {
                          "color": "#3a3a3a"
                      }
                  ]
              },
              {
                  "featureType": "administrative.locality",
                  "elementType": "labels.text.stroke",
                  "stylers": [
                      {
                          "weight": "3"
                      },
                      {
                          "visibility": "on"
                      },
                      {
                          "color": "#ffffff"
                      }
                  ]
              },
              {
                  "featureType": "landscape",
                  "elementType": "all",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "landscape",
                  "elementType": "geometry",
                  "stylers": [
                      {
                          "color": "#000000"
                      },
                      {
                          "lightness": 20
                      }
                  ]
              },
              {
                  "featureType": "poi",
                  "elementType": "all",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "poi",
                  "elementType": "geometry",
                  "stylers": [
                      {
                          "color": "#000000"
                      },
                      {
                          "lightness": 21
                      }
                  ]
              },
              {
                  "featureType": "road.highway",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "color": "#ffffff"
                      },
                      {
                          "lightness": 17
                      }
                  ]
              },
              {
                  "featureType": "road.highway",
                  "elementType": "geometry.stroke",
                  "stylers": [
                      {
                          "color": "#000000"
                      },
                      {
                          "lightness": 29
                      },
                      {
                          "weight": 0.2
                      },
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "road.highway",
                  "elementType": "labels.text.fill",
                  "stylers": [
                      {
                          "color": "#ffffff"
                      }
                  ]
              },
              {
                  "featureType": "road.highway",
                  "elementType": "labels.text.stroke",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "road.highway.controlled_access",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "visibility": "on"
                      },
                      {
                          "color": "#ffffff"
                      }
                  ]
              },
              {
                  "featureType": "road.highway.controlled_access",
                  "elementType": "geometry.stroke",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "road.arterial",
                  "elementType": "geometry",
                  "stylers": [
                      {
                          "color": "#000000"
                      },
                      {
                          "lightness": 18
                      }
                  ]
              },
              {
                  "featureType": "road.arterial",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "color": "#ffffff"
                      }
                  ]
              },
              {
                  "featureType": "road.arterial",
                  "elementType": "geometry.stroke",
                  "stylers": [
                      {
                          "color": "#ffffff"
                      }
                  ]
              },
              {
                  "featureType": "road.arterial",
                  "elementType": "labels.text",
                  "stylers": [
                      {
                          "color": "#ff0000"
                      }
                  ]
              },
              {
                  "featureType": "road.arterial",
                  "elementType": "labels.text.fill",
                  "stylers": [
                      {
                          "color": "#000000"
                      }
                  ]
              },
              {
                  "featureType": "road.arterial",
                  "elementType": "labels.text.stroke",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "road.local",
                  "elementType": "geometry",
                  "stylers": [
                      {
                          "color": "#000000"
                      },
                      {
                          "lightness": 16
                      }
                  ]
              },
              {
                  "featureType": "road.local",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "color": "#ffffff"
                      }
                  ]
              },
              {
                  "featureType": "road.local",
                  "elementType": "geometry.stroke",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "road.local",
                  "elementType": "labels.text",
                  "stylers": [
                      {
                          "color": "#ffffff"
                      }
                  ]
              },
              {
                  "featureType": "road.local",
                  "elementType": "labels.text.fill",
                  "stylers": [
                      {
                          "visibility": "on"
                      },
                      {
                          "color": "#000000"
                      }
                  ]
              },
              {
                  "featureType": "transit",
                  "elementType": "all",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "transit",
                  "elementType": "geometry",
                  "stylers": [
                      {
                          "color": "#000000"
                      },
                      {
                          "lightness": 19
                      }
                  ]
              },
              {
                  "featureType": "water",
                  "elementType": "all",
                  "stylers": [
                      {
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "water",
                  "elementType": "geometry",
                  "stylers": [
                      {
                          "color": "#000000"
                      },
                      {
                          "lightness": 17
                      }
                  ]
              }
          ],
          backgroundColor:'hsla(0, 0%, 0%, 0)',
          zoom:19
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
    mounted() {
      $('#schedule').fullpage({
        menu: '#menu',
        scrollingSpeed: 1000,
        scrollOverflow: true,
        normalScrollElements:'.normal-scroll',
        fixedElements:'.schedule-map',
        afterLoad: function(anchorLink, index){
          var loadedSection = $(this);
          console.log(index);
        }
      });
      $.fn.fullpage.reBuild();
    }
}

</script>

<style lang="scss">
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
</style>