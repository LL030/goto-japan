<template>
  <div class="content" id="content-mapcard">
    <div id="mapcard">
      <div v-for="(h, index) in hotels" :key="index" class="mapcard-item section" data-bgimg="http://feversoul.com/jp/src/assets/img/banner/skytree.jpg" style="background-image:linear-gradient(to right, rgba(0, 0, 0, 0.2),  rgba(0, 0, 0, 0.2)),url(http://feversoul.com/jp/src/assets/img/banner/skytree.jpg);">
        <div class="row">
          <div class="col-md-5">
            <div class="mapcard-content">
              <h5 class="h5">{{hotels[index]['title']}}</h5>
                <p v-if="index == 0">
                  地址：東向島201,墨田(Sumida), 東京, 日本<br/>
                  鄰近車站：東向島<br/>
                  價錢：335RMB／晚<br/>
                  CheckIn：09221500<br/>
                  CheckOut：09271000
                </p>
                <p v-if="index == 1">
                  地址：日本神奈川県鎌倉市腰越２丁目１３−１４<br/>
                  鄰近車站：腰越<br/>
                  價錢：728RMB／晚<br/>
                  CheckIn：09271600<br/>
                  CheckOut：09281100
                </p>
                <p v-if="index == 2">
                  地址：〒250-0408 神奈川県 足柄下郡箱根町強羅1300-70<br/>
                  鄰近車站：強羅<br/>
                  價錢：1990RMB／晚<br/>
                  CheckIn：09281700（預約）<br/>
                  CheckOut：09291100<br/>
                  *夕泊入席 19:30 前
                </p>
                <p v-if="index == 3">
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
            <div class="mapcard-map"  v-bind:id="index">
              <GoogleMap :id='index' :center='center' :styles='styles' :from='from[index]' :to='to[index]' :waypts='waypts[index]' :markers='markers[index]'></GoogleMap>
             </div>
          </div>
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
//import GoogleMap from '../plugin/GoogleMap.vue'
var hotels = [
  {
    loc:{lat:35.7242355,lng:139.8211222},
    station:{lat:35.7243000,lng:139.819456},
    title:'墨田民宿',
    icon:'info',
    stationPoint:'stationPoint',
    bgimg:'http://feversoul.com/jp/src/assets/img/banner/skytree.jpg'
  },
  {
    loc:{lat:35.308176,lng:139.492449},
    station:{lat:35.308294,lng:139.4931566},
    title:'AS ONE STYLE IN 湘南',
    icon:'info',
    stationPoint:'stationPoint',
    bgimg:'http://feversoul.com/jp/src/assets/img/banner/kamakuraroad.jpg'
  },
  {
    loc:{lat:35.248006,lng:139.046124},
    station:{lat:35.250714,lng:139.048215},
    title:'メルヴェール箱根強羅',
    icon:'info',
    stationPoint:'stationPoint',
    bgimg:'http://feversoul.com/jp/src/assets/img/banner/箱根.jpg'
  },
  {
    loc:{lat:34.981091,lng:135.817508},
    station:{lat:34.981626,lng:135.816595},
    title:'東野民宿',
    stationPoint:'stationPoint',
    bgimg:'http://feversoul.com/jp/src/assets/img/banner/京都.jpg'
  }
];
var a = {name:'a'};
var b = {name:'b'};
var c = {name:'c'};
var d = {name:'d'};
export default {
    name:"content-mapcard",
    data () {
        return {
          hotels:hotels,
          map:[a,b,c,d],
          from:[
            hotels[0]['station']['lat']+','+hotels[0]['station']['lng'],
            hotels[1]['station']['lat']+','+hotels[1]['station']['lng'],
            hotels[2]['station']['lat']+','+hotels[2]['station']['lng'],
            hotels[3]['station']['lat']+','+hotels[3]['station']['lng']
          ],
          to:[
            hotels[0]['loc']['lat']+','+hotels[0]['loc']['lng'],
            hotels[1]['loc']['lat']+','+hotels[1]['loc']['lng'],
            hotels[2]['loc']['lat']+','+hotels[2]['loc']['lng'],
            hotels[3]['loc']['lat']+','+hotels[3]['loc']['lng']
          ],
          waypts:[
            null,[{location:'35.307923,139.492670',stopover:true}],null,null
          ],
          center: {lat: 35.7075734, lng: 139.7320827},
          markers: [
            [
              {
                loc:hotels[0]['loc'],
                title:'酒店'
              },
              {
                loc:hotels[0]['station'],
                title:'車站',
              }
            ],
            [
              {
                loc:hotels[1]['loc'],
                title:'酒店'
              },
              {
                loc:hotels[1]['station'],
                title:'車站',
              }
            ],
            [
              {
                loc:hotels[2]['loc'],
                title:'酒店'
              },
              {
                loc:hotels[2]['station'],
                title:'車站',
              }
            ],
            [
              {
                loc:hotels[3]['loc'],
                title:'酒店'
              },
              {
                loc:hotels[3]['station'],
                title:'車站',
              }
            ]
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
                          "visibility": "on"
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
          zoom:17
        }
    },
    beforeCreate(){
        console.log('hotel beforeCreate');
    },
    created(){
        console.log('hotel created');
    },
    mounted() {
        console.log(this.from);
        console.log(this.to);
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
            //console.log(index);
            //using index
            //console.log($('.mapcard-item.active').data('bgimg'))
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