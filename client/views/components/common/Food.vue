<template>
<div id="schedule">
    <div class="section">
      <div class="map-container" style="height:65vw;background-image:linear-gradient(to right, rgba(0, 0, 0, 0.2),  rgba(0, 0, 0, 0.1)),url(http://feversoul.com/jp/src/assets/img/banner/京都.jpg);background-size: cover;">
        <div id="preview"></div>
        <input id="toggle" type="checkbox" checked>
        <label for="toggle"></label>
        <GoogleMap :id='id' :center='center' :styles='styles' :markers='markers' :zoom='zoom' :icon='icon'></GoogleMap>
      </div>
    </div>
    <div v-for="(h, index) in restaurants" :key="index" class="section" data-bgimg="http://feversoul.com/jp/src/assets/img/banner/skytree.jpg" style="background-image:linear-gradient(to right, rgba(0, 0, 0, 0.2),  rgba(0, 0, 0, 0.2)),url(http://feversoul.com/jp/src/assets/img/banner/skytree.jpg);">
      <div class="row" style="padding:5%;">
        <div class="col-md-5">
          <div class="mapcard-content">
            <h5 class="h5">{{restaurants[index]['title']}}</h5>
          </div>
        </div>
        <div class="col-md-7">
          <div class="mapcard-map" style="height:60vh" v-bind:id="index">
            <GoogleMap :id='index' :center='center' :styles='styles' :from='rfrom[index]' :to='rto[index]' :waypts='rwaypts[index]' :markers='markers[index]'></GoogleMap>
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
        loc:{lat:35.7110048,lng:139.7025377},
        station:{lat:35.7131020,lng:139.7003350},
        title:'餃子莊 ムロ',
        content:'東京都新宿区高田馬場1丁目33-2',
        open:' 17：00ー23：00',
        img:'http://feversoul.com/jp/src/assets/img/restaurants/餃子莊ムロ.jpg',
        icon:'station'
      },
      {
        loc:{lat:35.67792,lng:139.6747974},
        station:{lat:35.678791,lng:139.677289},
        title:'居酒屋魚貞',
        content:'東京都渋谷区幡ヶ谷2−8−13「月〜土」',
        open:'11:30-13:30 ; 17:00-23:30',
        img:'http://feversoul.com/jp/src/assets/img/restaurants/居酒屋魚貞.jpg',
        icon:'station'
      },
      {
        loc:{lat:35.7437489,lng:139.6460803},
        station:{lat:35.713102,lng:139.700335},
        title:'満天堂',
        content:'東京都練馬区練馬4-18-15',
        open:'11:30-14:00 ; 16:30-22:00 (定休日火曜日)',
        img:'http://feversoul.com/jp/src/assets/img/restaurants/満天堂.jpg',
        icon:'station'
      },
      {
        loc:{lat:35.6909603,lng:139.6632615},
        station:{lat:35.713102,lng:139.700335},
        title:'ミヤザキ商店',
        content:'東京都杉並区和田1−17−９',
        open:'18：00-2：00',
        img:'http://feversoul.com/jp/src/assets/img/restaurants/ミヤザキ商店.jpg',
        icon:'station'
      },
      {
        loc:{lat:35.6719523,lng:139.7973684},
        station:{lat:35.713102,lng:139.700335},
        title:'やきとり「庄助」',
        content:'東京都江東区富岡八幡宮',
        open:'',
        img:'http://feversoul.com/jp/src/assets/img/restaurants/やきとり「庄助」.jpg',
        icon:'station'
      },
      {
        loc:{lat:35.7236581,lng:139.6377397},
        station:{lat:35.713102,lng:139.700335},
        title:'みやこや',
        content:'東京都中野区鷺宮',
        open:'',
        img:'http://feversoul.com/jp/src/assets/img/restaurants/みやこや.jpg',
        icon:'station'
      },
      {
        loc:{lat:35.6600649,lng:139.6677612},
        station:{lat:35.713102,lng:139.700335},
        title:'お好み焼きと鉄板焼HIROKI',
        content:'東京都世田区北沢',
        open:'',
        img:'http://feversoul.com/jp/src/assets/img/restaurants/お好み焼きと鉄板焼HIROKI.jpg',
        icon:'station'
      },
      {
        loc:{lat:35.6841063,lng:139.7825141},
        station:{lat:35.713102,lng:139.700335},
        title:'天ぷら「中山」',
        content:'東京都中央区日本橋人形町1-10-8',
        open:'',
        img:'http://feversoul.com/jp/src/assets/img/restaurants/天ぷら「中山」.jpg',
        icon:'station'
      },
      {
        loc:{lat:35.71867813,lng:139.660121},
        station:{lat:35.713102,lng:139.700335},
        title:'平和苑（焼肉）',
        content:'池袋駅',
        open:'',
        img:'http://feversoul.com/jp/src/assets/img/restaurants/平和苑（焼肉）.jpg',
        icon:'station'
      },
      {
        loc:{lat:35.6719523,lng:139.7973684},
        station:{lat:35.713102,lng:139.700335},
        title:'ちゃんこ割烹大内',
        content:'東京都墨田区両国2-9-６',
        open:'',
        img:'http://feversoul.com/jp/src/assets/img/restaurants/ちゃんこ割烹大内.jpg',
        icon:'station'
      },
      {
        loc:{lat:35.2431092,lng:139.0577226},
        station:{lat:35.713102,lng:139.700335},
        title:'いろり家',
        content:'神奈川県足柄郡箱根町宮ノ下296',
        open:'',
        img:'http://feversoul.com/jp/src/assets/img/restaurants/いろり家.jpg',
        icon:'station'
      },
      {
        loc:{lat:35.6710086,lng:139.7129795},
        station:{lat:35.713102,lng:139.700335},
        title:'シャンウェイ',
        content:'東京都渋谷区神宮前3−7−５大鉄ビル２階',
        open:'',
        img:'http://feversoul.com/jp/src/assets/img/restaurants/シャンウェイ.jpg',
        icon:'station'
      },
      {
        loc:{lat:35.6479085,lng:139.708367},
        station:{lat:35.713102,lng:139.700335},
        title:'さいき',
        content:'東京都渋谷区恵比寿西1−7−12',
        open:'',
        img:'http://feversoul.com/jp/src/assets/img/restaurants/さいき.jpg',
        icon:'station'
      },
      {
        loc:{lat:35.697329,lng:139.8259066},
        station:{lat:35.713102,lng:139.700335},
        title:'ふらっとQUSUMI',
        content:'東京都江東区亀戸駅',
        open:'',
        img:'',
        icon:'station'
      },
      {
        loc:{lat:35.6664052,lng:139.7573256},
        station:{lat:35.713102,lng:139.700335},
        title:'牛かつおか田',
        content:'東京都港区新橋2-16-1ニュー新橋ビルB１F',
        open:'',
        img:'http://feversoul.com/jp/src/assets/img/restaurants/牛かつおか田.jpg',
        icon:'station'
      }
];
var foodMarkers = [];
var rFrom = [];
var rTo = [];
var rWaypts = [];
for (var i = 0; i < restaurants.length; ++i) {
  foodMarkers[i] = {loc:restaurants[i]['loc'],title:restaurants[i]['title']};
  rFrom[i] = restaurants[i]['station']['lat']+ ',' + restaurants[i]['station']['lng'];
  rTo[i] = restaurants[i]['loc']['lat']+ ',' + restaurants[i]['loc']['lng'];
  rWaypts[i] = null;
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