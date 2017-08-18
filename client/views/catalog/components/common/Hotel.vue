<template>
  <div class="content" id="content-mapcard">
    <div id="mapcard">
      <div class="mapcard-item section" data-bgimg="http://feversoul.com/jp/src/assets/img/banner/skytree.jpg" style="background-image:linear-gradient(to right, rgba(0, 0, 0, 0.2),  rgba(0, 0, 0, 0.2)),url(http://feversoul.com/jp/src/assets/img/banner/skytree.jpg);">
        <div class="row">
          <div class="col-md-5">
            <div class="mapcard-content">
              <h5 class="h5">東京 - 墨田民宿</h5>
              <p>
                地址：東向島201,墨田(Sumida), 東京, 日本<br/>
                鄰近車站：東向島<br/>
                價錢：335RMB／晚<br/>
                CheckIn：09221500<br/>
                CheckOut：09271000
              </p>
            </div>
          </div>
          <div class="col-md-7">
            <div class="mapcard-map" id="mapcard-map-0" data-point='0'></div>
          </div>
        </div> 
      </div>
      <div class="mapcard-item section" data-bgimg="http://feversoul.com/jp/src/assets/img/banner/kamakuraroad.jpg" style="background-image:linear-gradient(to right, rgba(0, 0, 0, 0.2),  rgba(0, 0, 0, 0.2)),url(http://feversoul.com/jp/src/assets/img/banner/kamakuraroad.jpg);">
        <div class="row">
          <div class="col-md-5">
            <div class="mapcard-content">
              <h5 class="h5">湘南 - AS ONE STYLE IN 湘南</h5>
              <p>
                地址：日本神奈川県鎌倉市腰越２丁目１３−１４<br/>
                鄰近車站：腰越<br/>
                價錢：728RMB／晚<br/>
                CheckIn：09271600<br/>
                CheckOut：09281100
              </p>
            </div>
          </div>
          <div class="col-md-7">
            <div class="mapcard-map" id="mapcard-map-1" data-point='1'></div>
          </div>
        </div>
      </div>
      <div class="mapcard-item section" data-bgimg="http://feversoul.com/jp/src/assets/img/banner/箱根.jpg" style="background-image:linear-gradient(to right, rgba(0, 0, 0, 0.2),  rgba(0, 0, 0, 0.2)),url(http://feversoul.com/jp/src/assets/img/banner/箱根.jpg);">
        <div class="row">
          <div class="col-md-5">
            <div class="mapcard-content">
              <h5 class="h5">箱根 - メルヴェール箱根強羅 溫泉旅館</h5>
              <p>
                地址：〒250-0408 神奈川県 足柄下郡箱根町強羅1300-70<br/>
                鄰近車站：強羅<br/>
                價錢：1990RMB／晚<br/>
                CheckIn：09281700（預約）<br/>
                CheckOut：09291100<br/>
                *夕泊入席 19:30 前
              </p>
            </div>
          </div>
          <div class="col-md-7">
            <div class="mapcard-map" id="mapcard-map-2" data-point='2'></div>
          </div>
        </div>
      </div>
      <div class="mapcard-item section" data-bgimg="http://feversoul.com/jp/src/assets/img/banner/京都.jpg" style="background-image:linear-gradient(to right, rgba(0, 0, 0, 0.2),  rgba(0, 0, 0, 0.2)),url(http://feversoul.com/jp/src/assets/img/banner/京都.jpg);">
        <div class="row">
          <div class="col-md-5">
            <div class="mapcard-content">
              <h5 class="h5">京都 - 東野民宿</h5>
              <p>
                地址：〒607-8142　京都市山科区東野中ノ井上町1-25　SAKIZO東野ビル　205号室<br/>
                鄰近車站：東野<br/>
                價錢：323RMB／晚<br/>
                CheckIn：09301600（預約）<br/>
                CheckOut：10031000<br/>
                *夕泊入席 19:30 前
              </p>
            </div>
          </div>
          <div class="col-md-7">
            <div class="mapcard-map" id="mapcard-map-3" data-point='3'></div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
//import GoogleMap from '../plugin/GoogleMap.vue'
export default {
    name:"content-mapcard",
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
    beforeCreate(){
        console.log('hotel beforeCreate');
    },
    created(){
        console.log('hotel created');
    },
    mounted() {
        console.log('hotel mounted');
        $('#mapcard').fullpage({
          anchors: ['a', 'b', 'c', 'd', 'e'],
          menu: '#menu',
          scrollingSpeed: 1000,
          navigation: true,
          navigationPosition: 'right',
          navigationTooltips: ['東京', '湘南', '箱根', '京都'],
          normalScrollElements:'.mapcard-map',
          afterLoad: function(anchorLink, index){
            var loadedSection = $(this);
            console.log(index);
            //using index
            console.log($('.mapcard-item.active').data('bgimg'))
            //$('body').css('background','linear-gradient(to right, rgba(0, 0, 0, 0.2),  rgba(0, 0, 0, 0.2)), url('+ $('.hotels-item.active').data('bgimg')+')');
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