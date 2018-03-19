<template>
<div id="food">
    <div class="section">
      <div class="inner-section-fixed">
        <div class="map-container rs-bg-img" style="background-image:linear-gradient(to right, rgba(0, 0, 0, 0.2),  rgba(0, 0, 0, 0.1)),url(http://www.pilakuma.com/jpt/src/assets/img/banner/sushi.jpg);background-size: cover;">
          <GoogleMap :id='id' :center='restaurants[0]["loc"]' :markers='markers' :zoom='zoom' :icon='icon'></GoogleMap>
        </div>
        <div class="station" style="background:#fff">
          <div class="d-flex flex-wrap">
            <div class="col station-item">
              <span class="btn-radius small" id="gokamakura" data-point='1'><a href="/food/a">中野區</a></span>
            </div>
            <div class="col station-item">
              <span class="btn-radius small" id="gokamakura" data-point='1'><a href="/food/b">練馬區</a></span>
            </div>
            <div class="col station-item">
              <span class="btn-radius small" id="gokamakura" data-point='1'><a href="/food/c">新宿區</a></span>
            </div>
            <div class="col station-item">
              <span class="btn-radius small" id="gokamakura" data-point='1'><a href="/food/d">澀谷區</a></span>
            </div>
            <div class="col station-item">
              <span class="btn-radius small" id="gohakone" data-point='2'><a href="/food/e">中央區</a></span>
            </div>
            <div class="col station-item">
              <span class="btn-radius small" id="gonagoya" data-point='3'><a href="/food/f">台東區</a></span>
            </div>
            <div class="col station-item">
              <span class="btn-radius small" id="gonagoya" data-point='3'><a href="/food/g">東京外</a></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-for="(h, index) in restaurants" :key="index" class="section rs-bg-img" v-bind:style="{backgroundImage:'linear-gradient(to right, rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.2)),url('+ h.img +')'}" v-bind:id="index">
      <div class="inner-section-fixed ">
        <div class="row" style="padding:5%;">
          <div class="col-md-5">
            <div class="mapcard-content">
              <h5 class="h5 text-white">{{restaurants[index]['title']}}</h5>
            </div>
          </div>
          <div class="col-md-7">
            <div class="mapcard-map normal-scroll" style="height:60vh" v-bind:id="index">
              <GoogleMap :id='index' :center='center' :styles='styles' :from='rfrom[index]' :to='rto[index]' :waypts='rwaypts[index]' :markers='markers'></GoogleMap>
             </div>
          </div>
        </div> 
      </div>
    </div>
</div>
</template>

<script>
//import GoogleMap from '../plugin/GoogleMap.vue'
var restaurants = [];
restaurants['a'] = [
      {
        loc:{lat:35.71867813,lng:139.660121},
        station:'沼袋駅',
        title:'平和苑（焼肉）',
        content:'池袋駅',
        open:'',
        img:'http://www.pilakuma.com/jpt/src/assets/img/restaurants/平和苑（焼肉）.jpg',
        icon:'station'
      },
      {
        loc:{lat:35.7236581,lng:139.6377397},
        station:'鷺ノ宮駅',
        title:'みやこや',
        content:'東京都中野区鷺宮',
        open:'',
        img:'http://www.pilakuma.com/jpt/src/assets/img/restaurants/みやこや.jpg',
        icon:'station'
      },
      {
        loc:{lat:35.6909603,lng:139.6632615},
        station:'中野富士見町站',
        title:'ミヤザキ商店',
        content:'東京都杉並区和田1−17−９',
        open:'18：00-2：00',
        img:'http://www.pilakuma.com/jpt/src/assets/img/restaurants/ミヤザキ商店.jpg',
        icon:'station'
      }
];
restaurants['b'] = [
      {
        loc:{lat:35.7437489,lng:139.6460803},
        station:'豊島園駅',
        title:'満天堂',
        content:'東京都練馬区練馬4-18-15',
        open:'11:30-14:00 ; 16:30-22:00 (定休日火曜日)',
        img:'http://www.pilakuma.com/jpt/src/assets/img/restaurants/満天堂.jpg',
        icon:'station'
      }
];
restaurants['c'] = [
      {
        loc:{lat:35.7110048,lng:139.7025377},
        station:'高田馬場',
        title:'餃子莊 ムロ',
        content:'東京都新宿区高田馬場1丁目33-2',
        open:' 17：00ー23：00',
        img:'http://www.pilakuma.com/jpt/src/assets/img/restaurants/餃子莊ムロ.jpg',
        icon:'station'
      }
];
restaurants['d'] = [
      {
        loc:{lat:35.67792,lng:139.6747974},
        station:'幡ヶ谷駅',
        title:'居酒屋魚貞',
        content:'東京都渋谷区幡ヶ谷2−8−13「月〜土」',
        open:'11:30-13:30 ; 17:00-23:30',
        img:'http://www.pilakuma.com/jpt/src/assets/img/restaurants/居酒屋魚貞.jpg',
        icon:'station'
      },
      {
        loc:{lat:35.6600649,lng:139.6677612},
        station:'下北沢駅',
        title:'お好み焼きと鉄板焼HIROKI',
        content:'東京都世田区北沢',
        open:'',
        img:'http://www.pilakuma.com/jpt/src/assets/img/restaurants/お好み焼きと鉄板焼HIROKI.jpg',
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
        loc:{lat:35.6710086,lng:139.7129795},
        station:'外苑前駅',
        title:'シャンウェイ',
        content:'東京都渋谷区神宮前3−7−５大鉄ビル２階',
        open:'',
        img:'http://www.pilakuma.com/jpt/src/assets/img/restaurants/シャンウェイ.jpg',
        icon:'station'
      }

];
 restaurants['e'] = [
      {
        loc:{lat:35.6841063,lng:139.7825141},
        station:'人形町駅',
        title:'天ぷら「中山」',
        content:'東京都中央区日本橋人形町1-10-8',
        open:'',
        img:'http://www.pilakuma.com/jpt/src/assets/img/restaurants/天ぷら「中山」.jpg',
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
      },
      {
        loc:{lat:35.6719523,lng:139.7973684},
        station:'門前仲町',
        title:'やきとり「庄助」',
        content:'東京都江東区富岡八幡宮',
        open:'',
        img:'http://www.pilakuma.com/jpt/src/assets/img/restaurants/やきとり「庄助」.jpg',
        icon:'station'
      }
];
 restaurants['f'] = [
      {
        loc:{lat:35.693596,lng:139.793093},
        station:'両国駅',
        title:'ちゃんこ割烹大内',
        content:'東京都墨田区両国2-9-６',
        open:'',
        img:'http://www.pilakuma.com/jpt/src/assets/img/restaurants/ちゃんこ割烹大内.jpg',
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
      }
];
 restaurants['g'] = [
      {
        loc:{lat:35.2431092,lng:139.0577226},
        station:'小涌谷駅',
        title:'いろり家',
        content:'神奈川県足柄郡箱根町宮ノ下296',
        open:'',
        img:'http://www.pilakuma.com/jpt/src/assets/img/restaurants/いろり家.jpg',
        icon:'station'
      }
]
let allRestaurants = restaurants['a'].concat(restaurants['b']).concat(restaurants['c']).concat(restaurants['d']).concat(restaurants['e']).concat(restaurants['f']).concat(restaurants['g']);
console.log(allRestaurants);
var foodMarkers = [];
var rFrom = [];
var rTo = [];
var rWaypts = [];
var rName = [];
for (var i = 0; i < restaurants['a'].length; ++i) {
  foodMarkers[i] = {loc:restaurants['a'][i]['loc'],title:restaurants['a'][i]['title']};
  rFrom[i] = restaurants['a'][i]['station'];
  rTo[i] = restaurants['a'][i]['loc']['lat']+ ',' + restaurants['a'][i]['loc']['lng'];
  rWaypts[i] = null;
  rName[i] = restaurants['a'][i]['title'];

}
export default {
    /* eslint-disable no-undef */
    name:"food",
    /*components: {
      'google-map': GoogleMap
    },*/
    props: ['zoon'],
    data () {
        return {
          restaurants:restaurants[this.zoon],
          id:99,
          idName:['aa','bb','cc','dd','ee','ff','gg','hh','ii','jj','kk','ll','mm','nn','oo','pp','qq'],
          center: {lat: 35.695000, lng: 139.730000},
          from:'東京',
          to:'京都',
          waypts:[{location:'湘南',stopover:true},{location:'箱根',stopover:true},{location:'名古屋',stopover:true}],
          markers: restaurants[this.zoon].map((x) => {
                   return {loc:x['loc'],title:x['title']};
                }),
          rfrom:restaurants[this.zoon].map((x) => {
                   return x['station'];
                }),
          rto:restaurants[this.zoon].map((x) => {
                   return x['loc']['lat'] + ',' + x['loc']['lng'];
                }),
          rwaypts:restaurants[this.zoon].map((x) => {
                   return null;
                }),
          mainMarker:allRestaurants.map((x) => {
                   return {loc:x['loc'],title:x['title']};
                }),
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
          backgroundColor:'hsla(0, 0%, 0%, 0)',
          zoom:12
        }
    },
    beforeCreate(){
      if($('.plan-back').length>0){
        $('.plan-back').remove();
      }
      if($('.schedule-map').length>0){
        $('.schedule-map').remove();
      }
      if ($( 'html' ).hasClass( 'fp-enabled' ) ) {
        $.fn.fullpage.destroy('all');
      }
    },
    destroyed(){
    },
    created(){
    },
    mounted() {
        $('#food').fullpage({
          menu: '#menu',
          scrollingSpeed: 1000,
          navigation: true,
          scrollOverflow: true,
          navigationPosition: 'right',
          normalScrollElements:'.normal-scroll',
          afterLoad: function(anchorLink, index){
            var loadedSection = $(this);
            console.log(index);
            //using index
            //console.log($('.mapcard-item.active').data('bgimg'))
            //$('body').css('background','linear-gradient(to right, rgba(0, 0, 0, 0.2),  rgba(0, 0, 0, 0.2)), url('+ $('.hotels-item.active').data('bgimg')+')');
          }
        });
        $.fn.fullpage.reBuild();
    }
}

</script>

<style lang="scss">
#food{
  .section{
    .inner-section-fixed{
      position:absolute;
      top:0px;
      left:0;
      width:100%;
      height:100%;
    }
  }
  .map-container{
    height: calc(100% - 90px);
  }
  .station{
    padding-top: 10px;
    padding-bottom: 10px;
    a{
      color: #f27c7c!important;
    }
    .btn-radius {
    }
  }
}
</style>