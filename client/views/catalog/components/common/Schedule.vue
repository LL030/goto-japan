<template>
<div id="schedule">
    <div class="section">
      <div class="map-container" style="background-image:linear-gradient(to right, rgba(0, 0, 0, 0.2),  rgba(0, 0, 0, 0.1)),url(http://feversoul.com/jp/src/assets/img/banner/京都.jpg);background-size: cover;">
        <div id="preview"></div>
        <input id="toggle" type="checkbox" checked>
        <label for="toggle"></label>
        <GoogleMap :center='center' :styles='styles' :from='from' :to='to' :waypts='waypts' :markers='markers'></GoogleMap>
      </div>
      <div class="station">
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
    </div>
    <div class="section">
      <h1 class="project-name">行程</h1>
      <div class="content" id="content-schedule">
        <div id="timeline">
          <div class="timeline-item">
            <div class="timeline-icon">
              <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="21px" height="20px" viewBox="0 0 21 20" enable-background="new 0 0 21 20" xml:space="preserve">
              <path fill="#FFFFFF" d="M19.998,6.766l-5.759-0.544c-0.362-0.032-0.676-0.264-0.822-0.61l-2.064-4.999c-0.329-0.825-1.5-0.825-1.83,0L7.476,5.611c-0.132,0.346-0.462,0.578-0.824,0.61L0.894,6.766C0.035,6.848-0.312,7.921,0.333,8.499l4.338,3.811c0.279,0.246,0.395,0.609,0.314,0.975l-1.304,5.345c-0.199,0.842,0.708,1.534,1.468,1.089l4.801-2.822c0.313-0.181,0.695-0.181,1.006,0l4.803,2.822c0.759,0.445,1.666-0.23,1.468-1.089l-1.288-5.345c-0.081-0.365,0.035-0.729,0.313-0.975l4.34-3.811C21.219,7.921,20.855,6.848,19.998,6.766z"/>
              </svg>
            </div>
            <div class="timeline-content">
              <h5 class="h5">Day 1 東京都 - 淺草、上野</h5>
              <p>
                19:25 落機<br/>
                20:30 Check In<br/>
                21:00 晴空塔（8：00～22：00）-> 隅田川公園 <br/>
                <!-- ふらっとQUSUMI -->
              </p>
              <div class="w-100 text-right">
                <span class="btn" >MORE</span>
              </div>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-icon">
              <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="21px" height="20px" viewBox="0 0 21 20" enable-background="new 0 0 21 20" xml:space="preserve">
              <path fill="#FFFFFF" d="M19.998,6.766l-5.759-0.544c-0.362-0.032-0.676-0.264-0.822-0.61l-2.064-4.999c-0.329-0.825-1.5-0.825-1.83,0L7.476,5.611c-0.132,0.346-0.462,0.578-0.824,0.61L0.894,6.766C0.035,6.848-0.312,7.921,0.333,8.499l4.338,3.811c0.279,0.246,0.395,0.609,0.314,0.975l-1.304,5.345c-0.199,0.842,0.708,1.534,1.468,1.089l4.801-2.822c0.313-0.181,0.695-0.181,1.006,0l4.803,2.822c0.759,0.445,1.666-0.23,1.468-1.089l-1.288-5.345c-0.081-0.365,0.035-0.729,0.313-0.975l4.34-3.811C21.219,7.921,20.855,6.848,19.998,6.766z"/>
              </svg>
            </div>
            <div class="timeline-content right">
              <h5 class="h5">Day 2 東京都 - 築地市場、台場、汐留、銀座</h5>
              <p>
                上午 築地市場新鮮海產 <br/>
              </p>
            </div>
          </div>

          <div class="timeline-item">
            <div class="timeline-icon">
              <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="21px" height="20px" viewBox="0 0 21 20" enable-background="new 0 0 21 20" xml:space="preserve">
              <path fill="#FFFFFF" d="M19.998,6.766l-5.759-0.544c-0.362-0.032-0.676-0.264-0.822-0.61l-2.064-4.999c-0.329-0.825-1.5-0.825-1.83,0L7.476,5.611c-0.132,0.346-0.462,0.578-0.824,0.61L0.894,6.766C0.035,6.848-0.312,7.921,0.333,8.499l4.338,3.811c0.279,0.246,0.395,0.609,0.314,0.975l-1.304,5.345c-0.199,0.842,0.708,1.534,1.468,1.089l4.801-2.822c0.313-0.181,0.695-0.181,1.006,0l4.803,2.822c0.759,0.445,1.666-0.23,1.468-1.089l-1.288-5.345c-0.081-0.365,0.035-0.729,0.313-0.975l4.34-3.811C21.219,7.921,20.855,6.848,19.998,6.766z"/>
              </svg>
            </div>
            <div class="timeline-content right">
              <h5 class="h5">Day 2 東京都 - 築地市場、台場、汐留、銀座</h5>
              <p>
                上午 築地市場新鮮海產 <br/>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
//import GoogleMap from '../plugin/GoogleMap.vue'
var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCVw1_JjXxdPMjZPluDqsXrVQV0AuaGRsU'
});
export default {
    /* eslint-disable no-undef */
    name:"schedule",
    /*components: {
      'google-map': GoogleMap
    },*/
    data () {
        return {
          map:null,
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
          backgroundColor:'hsla(0, 0%, 0%, 0)'
        }
    },
    beforeDestroy(){
      console.log('schedule beforeDestroy');
      //$.fn.fullpage.destroy('all');
    },
    destroyed(){
      console.log('schedule destroyed');
    },
    mounted() {
        $('#schedule').fullpage({
          anchors: ['a', 'b', 'c', 'd', 'e'],
          menu: '#menu',
          scrollingSpeed: 1000,
          navigation: true,
          scrollOverflow: true,
          navigationPosition: 'right',
          navigationTooltips: ['東京', '湘南', '箱根', '京都'],
          normalScrollElements:'#map',
          afterLoad: function(anchorLink, index){
            var loadedSection = $(this);
            console.log(index);
            //using index
            //console.log($('.mapcard-item.active').data('bgimg'))
            //$('body').css('background','linear-gradient(to right, rgba(0, 0, 0, 0.2),  rgba(0, 0, 0, 0.2)), url('+ $('.hotels-item.active').data('bgimg')+')');
          }
        });
        googleMapsClient.geocode({
          address: '京都'
        }, function(err, response) {
          if (!err) {
            console.log(response.json.results[0]);
          }
        });
    }
}

</script>

<style lang="scss">
.map-container {
  #map{
    position: relative;
    &:before{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: -webkit-repeating-radial-gradient(center center, rgba(0,0,0,.2), rgba(0,0,0,.2) 1px, transparent 1px, transparent 100%);
      background-image: -moz-repeating-radial-gradient(center center, rgba(0,0,0,.2), rgba(0,0,0,.2) 1px, transparent 1px, transparent 100%);
      background-image: -ms-repeating-radial-gradient(center center, rgba(0,0,0,.2), rgba(0,0,0,.2) 1px, transparent 1px, transparent 100%);
      background-image: repeating-radial-gradient(center center, rgba(0,0,0,.2), rgba(0,0,0,.2) 1px, transparent 1px, transparent 100%);
      -webkit-background-size: 3px 3px;
      -moz-background-size: 3px 3px;
      background-size: 3px 3px;
    }
  }
}
#schedule{
  .section{
    &:first-child{
      padding-top: 0px;
    }
    padding-top: 40px;
  }
}
</style>