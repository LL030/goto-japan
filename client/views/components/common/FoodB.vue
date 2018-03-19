<template>
<div id="schedule">
    <div class="section">
      <div class="map-container" style="height:65vw;background-image:linear-gradient(to right, rgba(0, 0, 0, 0.2),  rgba(0, 0, 0, 0.1)),url(http://www.pilakuma.com/jpt/src/assets/img/banner/sushi.jpg);background-size: cover;">
        <div id="preview"></div>
        <input id="toggle" type="checkbox" checked>
        <label for="toggle"></label>
        <GoogleMap :id='id' :center='center' :styles='mainStyles' :markers='markers' :zoom='zoom' :icon='icon'></GoogleMap>
      </div>
    </div>
    <div v-for="(h, index) in restaurants" :key="index" class="section" data-bgimg="http://www.pilakuma.com/jpt/src/assets/img/banner/skytree.jpg" v-bind:style="{backgroundImage:'linear-gradient(to right, rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.2)),url('+ h.img +')'}" v-bind:id="index">
      <div class="row" style="padding:5%;">
        <div class="col-md-5">
          <div class="mapcard-content">
            <h5 class="h5 text-white">{{restaurants[index]['title']}}</h5>
          </div>
        </div>
        <div class="col-md-7">
          <div class="mapcard-map" style="height:60vh" v-bind:id="index">
            <GoogleMap :id='index' :center='center' :styles='styles' :from='rfrom[index]' :to='rto[index]' :waypts='rwaypts[index]' :markers='markers'></GoogleMap>
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
var restaurants = [
      {
        loc:{lat:35.6719523,lng:139.7973684},
        station:'両国駅',
        title:'ちゃんこ割烹大内',
        content:'東京都墨田区両国2-9-６',
        open:'',
        img:'http://www.pilakuma.com/jpt/src/assets/img/restaurants/ちゃんこ割烹大内.jpg',
        icon:'station'
      },
      {
        loc:{lat:35.2431092,lng:139.0577226},
        station:'小涌谷駅',
        title:'いろり家',
        content:'神奈川県足柄郡箱根町宮ノ下296',
        open:'',
        img:'http://www.pilakuma.com/jpt/src/assets/img/restaurants/いろり家.jpg',
        icon:'station'
      },
      {
        loc:{lat:35.6710086,lng:139.7129795},
        station:'外苑前駅',
        title:'シャンウェイ',
        content:'東京都渋谷区神宮前3−7−５大鉄ビル２階',
        open:'',
        img:'http://www.pilakuma.com/jpt/src/assets/img/restaurants/シャンウェイ.jpg',
        icon:'station'
      },
      {
        loc:{lat:35.6479085,lng:139.708367},
        station:'恵比寿駅',
        title:'さいき',
        content:'東京都渋谷区恵比寿西1−7−12',
        open:'',
        img:'http://www.pilakuma.com/jpt/src/assets/img/restaurants/さいき.jpg',
        icon:'station'
      },
      {
        loc:{lat:35.697329,lng:139.8259066},
        station:'亀戸駅',
        title:'ふらっとQUSUMI',
        content:'東京都江東区亀戸駅',
        open:'',
        img:'',
        icon:'station'
      },
      {
        loc:{lat:35.6664052,lng:139.7573256},
        station:'新橋駅',
        title:'牛かつおか田',
        content:'東京都港区新橋2-16-1ニュー新橋ビルB１F',
        open:'',
        img:'http://www.pilakuma.com/jpt/src/assets/img/restaurants/牛かつおか田.jpg',
        icon:'station'
      }
];
var foodMarkers = [];
var rFrom = [];
var rTo = [];
var rWaypts = [];
var rName = [];
for (var i = 0; i < restaurants.length; ++i) {
  foodMarkers[i] = {loc:restaurants[i]['loc'],title:restaurants[i]['title']};
  rFrom[i] = restaurants[i]['station'];
  rTo[i] = restaurants[i]['loc']['lat']+ ',' + restaurants[i]['loc']['lng'];
  rWaypts[i] = null;
  rName[i] = restaurants[i]['title'];

}
export default {
    /* eslint-disable no-undef */
    name:"schedule",
    /*components: {
      'google-map': GoogleMap
    },*/
    data () {
        return {
          restaurants:restaurants,
          id:99,
          idName:['aa','bb','cc','dd','ee','ff','gg','hh','ii','jj','kk','ll','mm','nn','oo','pp','qq'],
          center: {lat: 35.7005734, lng: 139.7320827},
          from:'東京',
          to:'京都',
          waypts:[{location:'湘南',stopover:true},{location:'箱根',stopover:true},{location:'名古屋',stopover:true}],
          markers: foodMarkers,
          rfrom:rFrom,
          rto:rTo,
          rwaypts:rWaypts,
          icon:'food',
          styles:[
            {
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative",
              "stylers": [
                {
                  "color": "#000000"
                },
                {
                  "lightness": 17
                },
                {
                  "visibility": "on"
                },
                {
                  "weight": 1.2
                }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#000000"
                },
                {
                  "lightness": 20
                },
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "administrative.locality",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#3a3a3a"
                },
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "administrative.locality",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#ffffff"
                },
                {
                  "visibility": "on"
                },
                {
                  "weight": "3"
                }
              ]
            },
            {
              "featureType": "administrative.province",
              "stylers": [
                {
                  "color": "#CDDC39"
                },
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "landscape",
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
              "featureType": "road",
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "transit",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "saturation": -75
                },
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "labels.icon",
              "stylers": [
                {
                  "color": "#ff8000"
                },
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "labels.text",
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#ffffff"
                },
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#800040"
                },
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "transit.station.rail",
              "elementType": "labels.icon",
              "stylers": [
                {
                  "color": "#ff8000"
                }
              ]
            },
            {
              "featureType": "transit.station.rail",
              "elementType": "labels.text",
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "transit.station.rail",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#ffffff"
                }
              ]
            },
            {
              "featureType": "transit.station.rail",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#800000"
                }
              ]
            },
            {
              "featureType": "water",
              "stylers": [
                {
                  "visibility": "on"
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
          mainStyles:[
            {
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative",
              "stylers": [
                {
                  "color": "#000000"
                },
                {
                  "lightness": 17
                },
                {
                  "visibility": "on"
                },
                {
                  "weight": 1.2
                }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#000000"
                },
                {
                  "lightness": 20
                },
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "administrative.locality",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#3a3a3a"
                },
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "administrative.locality",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#ffffff"
                },
                {
                  "visibility": "on"
                },
                {
                  "weight": "3"
                }
              ]
            },
            {
              "featureType": "administrative.province",
              "stylers": [
                {
                  "color": "#CDDC39"
                },
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "landscape",
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
              "featureType": "road",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "transit",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "saturation": -75
                },
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "labels.icon",
              "stylers": [
                {
                  "color": "#ff8000"
                },
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "labels.text",
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#ffffff"
                },
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#800040"
                },
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "transit.station.rail",
              "elementType": "labels.icon",
              "stylers": [
                {
                  "color": "#ff8000"
                }
              ]
            },
            {
              "featureType": "transit.station.rail",
              "elementType": "labels.text",
              "stylers": [
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "transit.station.rail",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#ffffff"
                }
              ]
            },
            {
              "featureType": "transit.station.rail",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#800000"
                }
              ]
            },
            {
              "featureType": "water",
              "stylers": [
                {
                  "visibility": "on"
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
          zoom:12
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

        console.log(restaurants.length);
        $('#schedule').fullpage({
          menu: '#menu',
          scrollingSpeed: 1000,
          navigation: true,
          scrollOverflow: true,
          navigationPosition: 'right',
          normalScrollElements:'#map',
          afterLoad: function(anchorLink, index){
            var loadedSection = $(this);
            console.log(index);
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