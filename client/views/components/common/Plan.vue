<template>
  <div class="content plans" id="plans-container">
      <router-link to="/" class="plan-back"><i class="fa fa-undo plan-back-icon" aria-hidden="true"></i></router-link>
    <div id="plans-item" v-if="day">
      <div class="section">
        <div class="inner-section-fixed">
          <div class="plans-map large"  v-bind:style="{backgroundSize:'cover',backgroundImage:'linear-gradient(to right, rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.2)),url('+ plans[day -1]['bgimg'] +')'}" v-bind:id="1">
            <GoogleMap :id='1' :center='center' :styles='stylesMain' :from='plans[day -1]["from"]' :to='plans[day -1]["to"]' :waypts='plans[day -1]["waypts"]' :markers='plans[day -1]["markers"]'>
            </GoogleMap>
          </div>
          <div style="width:100vw;height:90px;"></div>
        </div>
      </div>
      <div class="section">
        <div class="inner-section-fixed">
          <div class="inner-section">
            <div class="row">
              <div class="col-md-12">
                <div class="plans-content">
                  <h5 class="h5">{{plans[day -1]['title']}}</h5>
                  <div v-if="day == 1">
                  19:25 落機<br/>
                  20:30 Check In<br/>
                  21:00 晴空塔（8：00～22：00）-> 隅田川公園 <br/>
                  <!-- ふらっとQUSUMI -->
                  </div>
  	              <div v-if="day == 2">
  	                 日比谷公園散步看楓葉，Caretta 45F 觀景。<br/>
                     <div style="width: 100%;height:300px;margin:20px auto">
                      <GoogleMap :id='2' 
                      :styles='styles' 
                      :from='plans[day -1]["markers"][0]["loc"]["lat"] + "," + plans[day -1]["markers"][0]["loc"]["lng"]' 
                      :to='plans[day -1]["markers"][2]["loc"]["lat"] + "," + plans[day -1]["markers"][2]["loc"]["lng"]' 
                      :waypts='[
                        {
                          location:plans[day -1]["markers"][1]["loc"]["lat"] + "," + plans[day -1]["markers"][1]["loc"]["lng"],
                          stopover:true
                        }
                      ]'
                      :markers='plans[day -1]["markers"].slice(0,3)'>
                     </GoogleMap>
                     </div>
  	                 築地市場新鮮海產 「築地站」，波除稻荷神社OR本願寺參觀<br/>
                     <div style="width: 100%;height:300px;margin:20px auto">
                      <GoogleMap :id='3' 
                      :styles='styles' 
                      :from='plans[day -1]["markers"][2]["loc"]["lat"] + "," + plans[day -1]["markers"][2]["loc"]["lng"]' 
                      :to='plans[day -1]["markers"][5]["loc"]["lat"] + "," + plans[day -1]["markers"][5]["loc"]["lng"]' 
                      :waypts='[
                        {
                          location:plans[day -1]["markers"][3]["loc"]["lat"] + "," + plans[day -1]["markers"][3]["loc"]["lng"],
                          stopover:true
                        },
                        {
                          location:plans[day -1]["markers"][4]["loc"]["lat"] + "," + plans[day -1]["markers"][4]["loc"]["lng"],
                          stopover:true
                        }
                      ]'
                      :markers='plans[day -1]["markers"].slice(2,6)'>
                     </GoogleMap>
                     </div>
  	                 月島漫步<br/>
                     <div style="width: 100%;height:300px;margin:20px auto">
                      <GoogleMap :id='4' 
                      :styles='styles' 
                      :from='plans[day -1]["markers"][5]["loc"]["lat"] + "," + plans[day -1]["markers"][5]["loc"]["lng"]' 
                      :to='plans[day -1]["markers"][6]["loc"]["lat"] + "," + plans[day -1]["markers"][6]["loc"]["lng"]' 
                      :markers='plans[day -1]["markers"].slice(5,7)'>
                     </GoogleMap>
                     </div>
  	                 台場高達，自由女神，睇彩虹橋,大江戶溫泉物語<br/> 
                     <div style="width: 100%;height:300px;margin:20px auto">
                      <GoogleMap :id='5' 
                      :styles='styles' 
                      :from='plans[day -1]["markers"][7]["loc"]["lat"] + "," + plans[day -1]["markers"][7]["loc"]["lng"]' 
                      :to='plans[day -1]["markers"][9]["loc"]["lat"] + "," + plans[day -1]["markers"][9]["loc"]["lng"]' 
                      :waypts='[
                        {
                          location:plans[day -1]["markers"][8]["loc"]["lat"] + "," + plans[day -1]["markers"][8]["loc"]["lng"],
                          stopover:true
                        }
                      ]'
                      :markers='plans[day -1]["markers"].slice(7,10)'>
                     </GoogleMap>
                     </div>
  	              </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
        <div class="row">
          <div class="col-6">
            <div class="text-center">
              <h1>DAY 1 - 淺草</h1>
              <p>說到東京景點，雷門燈籠儼然成為社群軟體上最受歡迎的拍照景點；到淺草寺參拜前，先到仲見世通品嚐人形燒與銅鑼燒。之後可以前往晴空塔，朝聖東京旅遊的新地標，東京自由行不妨安排一個和服體驗行程，漫步在淺草街頭。</p>
            </div>
          </div>
          <div class="col-6">
            <div class="text-center">
              <h1>DAY 2 - 築地、月島、台場</h1>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <div class="text-center">
              <h1>DAY 3 - 千葉 - GameShow</h1>
            </div>
          </div>
          <div class="col-6">
            <div class="text-center">
              <h1>DAY 4 - 三鷹、下町中街、秋葉原</h1>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <div class="text-center">
              <h1>DAY 5 - 目黑、涉谷、新宿</h1>
            </div>
          </div>
          <div class="col-6">
            <div class="text-center">
              <h1>DAY 6 - 鐮倉、江之島</h1>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <div class="text-center">
              <h1>DAY 7 - 箱根、蘆之湖</h1>
            </div>
          </div>
          <div class="col-6">
            <div class="text-center">
              <h1>DAY 8 - 名古屋</h1>
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
    bgimg:'http://feversoul.com/jp/src/assets/img/banner/skytree.jpg',
    photos:[
      'https://a0.muscache.com/im/pictures/ca9f1d9a-fba6-4104-8030-591949f59bcd.jpg?aki_policy=xx_large',
      'https://a0.muscache.com/im/pictures/3c190b8f-2bce-4470-8740-d7d8e1c4b0c6.jpg?aki_policy=x_large',
      'https://a0.muscache.com/im/pictures/9b5dd9b5-3b91-49b9-900a-242963cc2aed.jpg?aki_policy=x_large',
      'https://a0.muscache.com/im/pictures/d82357f9-e780-46e7-8af2-3136938b5a5d.jpg?aki_policy=x_large'
    ]
  },
  {
    loc:{lat:35.308176,lng:139.492449},
    station:{lat:35.308294,lng:139.4931566},
    title:'AS ONE STYLE IN 湘南',
    icon:'info',
    stationPoint:'stationPoint',
    bgimg:'http://feversoul.com/jp/src/assets/img/banner/kamakuraroad.jpg',
    photos:[
      'https://pix6.agoda.net/hotelImages/161/1615512/1615512_16112200560048954440.jpg?s=1024x768',
      'https://pix6.agoda.net/hotelImages/161/1615512/1615512_16111511420048724555.jpg?s=1024x768',
      'https://pix6.agoda.net/hotelImages/161/1615512/1615512_16111511410048724525.jpg?s=1024x768',
      'https://pix6.agoda.net/hotelImages/161/1615512/1615512_16111511420048724557.jpg?s=1024x768'
      
    ]
  },
  {
    loc:{lat:35.248006,lng:139.046124},
    station:{lat:35.250714,lng:139.048215},
    title:'メルヴェール箱根強羅',
    icon:'info',
    stationPoint:'stationPoint',
    bgimg:'http://feversoul.com/jp/src/assets/img/banner/箱根.jpg',
    photos:[
      'https://tabiiro.jp/lpimg/yado/100933/guestroom/img2.jpg',
      'http://cdn.jalan.jp/jalan/images/pict3L/Y1/Y325831/Y325831902.jpg',
      'http://cdn.jalan.jp/jalan/images/pict3L/Y1/Y325831/Y325831AD5.jpg',
      'http://cdn.jalan.jp/jalan/images/pict3L/Y1/Y325831/Y325831883.jpg'
    ]
  },
  {
    loc:{lat:34.981091,lng:135.817508},
    station:{lat:34.981626,lng:135.816595},
    title:'東野民宿',
    stationPoint:'stationPoint',
    bgimg:'http://feversoul.com/jp/src/assets/img/banner/京都.jpg',
    photos:[
      'https://a0.muscache.com/im/pictures/ca12e056-6e16-41d4-8fa7-7aa652754198.jpg?aki_policy=x_large',
      'https://a0.muscache.com/im/pictures/98234dd4-1eb4-414c-b572-a1a4038b7621.jpg?aki_policy=x_large',
      'https://a0.muscache.com/im/pictures/cf534f1d-84a0-439a-8dd9-dc09eb163bb8.jpg?aki_policy=x_large',
      'https://a0.muscache.com/im/pictures/317832f7-e7be-417f-86ad-97095cd379a6.jpg?aki_policy=x_large'
    ]
  }
];
var restaurants = [
      {
        loc:{lat:35.7110048,lng:139.7025377},
        station:'高田馬場',
        title:'餃子莊 ムロ',
        content:'東京都新宿区高田馬場1丁目33-2',
        open:' 17：00ー23：00',
        img:'http://feversoul.com/jp/src/assets/img/restaurants/餃子莊ムロ.jpg',
        icon:'station'
      },
      {
        loc:{lat:35.67792,lng:139.6747974},
        station:'幡ヶ谷駅',
        title:'居酒屋魚貞',
        content:'東京都渋谷区幡ヶ谷2−8−13「月〜土」',
        open:'11:30-13:30 ; 17:00-23:30',
        img:'http://feversoul.com/jp/src/assets/img/restaurants/居酒屋魚貞.jpg',
        icon:'station'
      },
      {
        loc:{lat:35.7437489,lng:139.6460803},
        station:'豊島園駅',
        title:'満天堂',
        content:'東京都練馬区練馬4-18-15',
        open:'11:30-14:00 ; 16:30-22:00 (定休日火曜日)',
        img:'http://feversoul.com/jp/src/assets/img/restaurants/満天堂.jpg',
        icon:'station'
      },
      {
        loc:{lat:35.6909603,lng:139.6632615},
        station:'中野富士見町站',
        title:'ミヤザキ商店',
        content:'東京都杉並区和田1−17−９',
        open:'18：00-2：00',
        img:'http://feversoul.com/jp/src/assets/img/restaurants/ミヤザキ商店.jpg',
        icon:'station'
      },
      {
        loc:{lat:35.6719523,lng:139.7973684},
        station:'門前仲町',
        title:'やきとり「庄助」',
        content:'東京都江東区富岡八幡宮',
        open:'',
        img:'http://feversoul.com/jp/src/assets/img/restaurants/やきとり「庄助」.jpg',
        icon:'station'
      },
      {
        loc:{lat:35.7236581,lng:139.6377397},
        station:'鷺ノ宮駅',
        title:'みやこや',
        content:'東京都中野区鷺宮',
        open:'',
        img:'http://feversoul.com/jp/src/assets/img/restaurants/みやこや.jpg',
        icon:'station'
      },
      {
        loc:{lat:35.6600649,lng:139.6677612},
        station:'下北沢駅',
        title:'お好み焼きと鉄板焼HIROKI',
        content:'東京都世田区北沢',
        open:'',
        img:'http://feversoul.com/jp/src/assets/img/restaurants/お好み焼きと鉄板焼HIROKI.jpg',
        icon:'station'
      },
      {
        loc:{lat:35.6841063,lng:139.7825141},
        station:'人形町駅',
        title:'天ぷら「中山」',
        content:'東京都中央区日本橋人形町1-10-8',
        open:'',
        img:'http://feversoul.com/jp/src/assets/img/restaurants/天ぷら「中山」.jpg',
        icon:'station'
      },
      {
        loc:{lat:35.71867813,lng:139.660121},
        station:'沼袋駅',
        title:'平和苑（焼肉）',
        content:'池袋駅',
        open:'',
        img:'http://feversoul.com/jp/src/assets/img/restaurants/平和苑（焼肉）.jpg',
        icon:'station'
      },
      {
        loc:{lat:35.693596,lng:139.793093},
        station:'両国駅',
        title:'ちゃんこ割烹大内',
        content:'東京都墨田区両国2-9-６',
        open:'',
        img:'http://feversoul.com/jp/src/assets/img/restaurants/ちゃんこ割烹大内.jpg',
        icon:'station'
      },
      {
        loc:{lat:35.2431092,lng:139.0577226},
        station:'小涌谷駅',
        title:'いろり家',
        content:'神奈川県足柄郡箱根町宮ノ下296',
        open:'',
        img:'http://feversoul.com/jp/src/assets/img/restaurants/いろり家.jpg',
        icon:'station'
      },
      {
        loc:{lat:35.6710086,lng:139.7129795},
        station:'外苑前駅',
        title:'シャンウェイ',
        content:'東京都渋谷区神宮前3−7−５大鉄ビル２階',
        open:'',
        img:'http://feversoul.com/jp/src/assets/img/restaurants/シャンウェイ.jpg',
        icon:'station'
      },
      {
        loc:{lat:35.6479085,lng:139.708367},
        station:'恵比寿駅',
        title:'さいき',
        content:'東京都渋谷区恵比寿西1−7−12',
        open:'',
        img:'http://feversoul.com/jp/src/assets/img/restaurants/さいき.jpg',
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
        img:'http://feversoul.com/jp/src/assets/img/restaurants/牛かつおか田.jpg',
        icon:'station'
      }
];
var plans = [
	{
		title:"Day 1 東京都 - 淺草、上野",
		from:'35.7242355,139.8211222',
		to:'晴空塔',
		waypts:[
			{location:'35.7243000,139.819456',stopover:true},
			{location:'35.712487,139.803965',stopover:true}
		],
		markers:[
			{loc:{lat:35.7242355,lng:139.8211222},title:'BNB'},
			{loc:{lat:35.7243000,lng:139.819456},title:'車站'},
			{loc:{lat:35.712487,lng:139.803965},title:'隅田川公園'},
			{loc:{lat:35.710063,lng:139.810700},title:'晴空塔'}
		],
		bgimg:'http://feversoul.com/jp/src/assets/img/banner/skytree2.jpg'
	},
  {
    title:"Day 2 東京都 - 築地、台場、",
    from:'35.674890,139.759605',
    to:'35.624718,139.781184',
    waypts:[
      {location:'35.671839,139.755146',stopover:true},
      {location:'35.664880,139.762487',stopover:true},
      {location:'35.665486,139.770667',stopover:true},
      {location:'35.666451,139.772285',stopover:true},
      {location:'35.663501,139.771603',stopover:true},
      {location:'35.662613,139.780453',stopover:true},
      {location:'35.627843,139.771823',stopover:true},
      {location:'35.625122,139.775450',stopover:true},
      {location:'35.615491,139.777509',stopover:true}
    ],
    markers:[
      {loc:{lat:35.674890,lng:139.759605},title:'日比谷駅'},
      {loc:{lat:35.671839,lng:139.755146},title:'日比谷公園'},
      {loc:{lat:35.664880,lng:139.762487},title:'Caretta 46F'},
      {loc:{lat:35.665486,lng:139.770667},title:'築地市場'},
      {loc:{lat:35.666451,lng:139.772285},title:'築地本願寺'},
      {loc:{lat:35.663501,lng:139.771603},title:'波除稻荷神社'},
      {loc:{lat:35.662613,lng:139.780453},title:'月島駅'},
      {loc:{lat:35.627843,lng:139.771823},title:'台場自由女神'},
      {loc:{lat:35.625122,lng:139.775450},title:'台場高達'},
      {loc:{lat:35.615491,lng:139.777509},title:'大江戶溫泉物語'},
      {loc:{lat:35.624718,lng:139.781184},title:'青海駅'}
    ],
    bgimg:'https://storage.googleapis.com/ay-image-upload/1493884228054_tokyo_odaibabanner.jpg'
  },
  {
    title:"Day 3 東京都 - 千葉GameShow - 秋葉原 - 君の名は",
    from:'35.7243000,139.819456',
    to:'35.7243000,139.819456',
    waypts:[
      {location:'35.647451,140.035231',stopover:true},
      {location:'35.652932,140.043397',stopover:true},
      {location:'35.6719523,139.7973684',stopover:true},
      {location:'35.6841063,139.7825141',stopover:true},
      {location:'35.701078,139.772879',stopover:true},
      {location:'35.699958,139.770191',stopover:true},
      {location:'35.703280,139.774108',stopover:true},
      {location:'35.693596,139.793093',stopover:true}
    ],
    markers:[
      {loc:{lat:35.7243000,lng:139.819456},title:'BNB'},
      {loc:{lat:35.647451,lng:140.035231},title:'日本千葉幕張展覽館'},
      {loc:{lat:35.652932,lng:140.043397},title:'千葉IBM附近小餐館'},
      {loc:{lat:35.701078,lng:139.772879},title:'秋葉原UDX'},
      {loc:{lat:35.699958,lng:139.770191},title:'秋葉原電器街'},
      {loc:{lat:35.703280,lng:139.774108},title:'2k540 AKI-OKA ARTISAN'},
      {loc:{lat:35.693596,lng:139.793093},title:'ちゃんこ割烹大内'},
      {loc:{lat:35.6841063,lng:139.7825141},title:'天ぷら「中山」'},
      {loc:{lat:35.6719523,lng:139.7973684},title:'やきとり「庄助」'}
    ],
    bgimg:'https://storage.googleapis.com/ay-image-upload/1493884228054_tokyo_odaibabanner.jpg'
  },
  {
    title:"Day 4 三鷹、練馬區、中野區",
    from:'35.7243000,139.819456',
    to:'35.7243000,139.819456',
    waypts:[
      {location:'35.7437489,139.6460803',stopover:true},
      {location:'35.696238,139.570432',stopover:true},
      {location:'35.7236581,139.6377397',stopover:true},
      {location:'35.71867813,139.660121',stopover:true},
      {location:'35.7110048,139.7025377',stopover:true},
      {location:'35.680060,139.720320',stopover:true},
      {location:'35.682154,139.733970',stopover:true},
      {location:'35.686564,139.725334',stopover:true}
    ],
    markers:[
      {loc:{lat:35.7243000,lng:139.819456},title:'BNB'},
      {loc:{lat:35.696238,lng:139.570432},title:'吉卜力美術館'},
      {loc:{lat:35.7110048,lng:139.7025377},title:'餃子莊 ムロ',icon:'food'},
      {loc:{lat:35.680060,lng:139.720320},title:'信濃町站(君の名は)'},
      {loc:{lat:35.682154,lng:139.733970},title:'須賀神社(君の名は)'},
      {loc:{lat:35.686564,lng:139.725334},title:'四谷二丁目(君の名は)'},
      {loc:{lat:35.71867813,lng:139.660121},title:'平和苑（焼肉）',icon:'food'},
      {loc:{lat:35.7437489,lng:139.6460803},title:'満天堂',icon:'food'},
      {loc:{lat:35.7236581,lng:139.6377397},title:'みやこや',icon:'food'}
    ],
    bgimg:'https://storage.googleapis.com/ay-image-upload/1493884228054_tokyo_odaibabanner.jpg'
  },
  {
    title:"Day 5 新宿、澀谷、目黑",
    from:'35.7243000,139.819456',
    to:'35.7243000,139.819456',
    waypts:[
      {location:'35.661252,139.696393',stopover:true},
      {location:'35.609208,139.669361',stopover:true},
      {location:'35.644288,139.699096',stopover:true}
    ],
    markers:[
      {loc:{lat:35.7243000,lng:139.819456},title:'BNB'},
      {loc:{lat:35.661252,lng:139.696393},title:'澀谷101'},
      {loc:{lat:35.609208,lng:139.669361},title:'自由之丘'},
      {loc:{lat:35.644288,lng:139.699096},title:'中目黑'},
      {loc:{lat:35.682154,lng:139.733970},title:'須賀神社(君の名は)'},
      {loc:{lat:35.686564,lng:139.725334},title:'四谷二丁目(君の名は)'},
      {loc:{lat:35.71867813,lng:139.660121},title:'平和苑（焼肉）',icon:'food'},
      {loc:{lat:35.7437489,lng:139.6460803},title:'満天堂',icon:'food'},
      {loc:{lat:35.7236581,lng:139.6377397},title:'みやこや',icon:'food'}
    ],
    bgimg:'https://storage.googleapis.com/ay-image-upload/1493884228054_tokyo_odaibabanner.jpg'
  }
];
for (var i = 0; i < restaurants.length; ++i) {
  plans[0]['markers'].push({loc:restaurants[i]['loc'],title:restaurants[i]['title'],icon:'food'});
  plans[1]['markers'].push({loc:restaurants[i]['loc'],title:restaurants[i]['title'],icon:'food'});
  plans[2]['markers'].push({loc:restaurants[i]['loc'],title:restaurants[i]['title'],icon:'food'});
}
var a = {name:'a'};
var b = {name:'b'};
var c = {name:'c'};
var d = {name:'d'};
export default {
    name:"plans-container",
    props: ['day'],
    data () {
        return {
          plans:plans,
          //vue style
          photoItemStyle:{
            width:'200px',
            height:'200px'
          },
          //map prop
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
          waypts:plans[0]['waypts'],
          center: {lat: 35.7075734, lng: 139.7320827},
          markers: plans[0]['markers'],
          stylesMain:[
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
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "road.highway",
                  "elementType": "geometry.stroke",
                  "stylers": [
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
                          "visibility": "off"
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
                          "visibility": "off"
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
                          "lightness": 1
                      }
                  ]
              },
              {
                  "featureType": "road.arterial",
                  "elementType": "geometry.fill",
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
                  "featureType": "road.arterial",
                  "elementType": "geometry.stroke",
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
                  "featureType": "road.arterial",
                  "elementType": "labels.text",
                  "stylers": [
                      {
                          "visibility": "on"
                      },
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
                          "visibility": "on"
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
                          "visibility": "off"
                      },
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
                          "visibility": "off"
                      },
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
                          "visibility": "off"
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
                          "visibility": "off"
                      }
                  ]
              },
              {
                  "featureType": "road.highway",
                  "elementType": "geometry.stroke",
                  "stylers": [
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
                          "visibility": "off"
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
                          "visibility": "off"
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
                          "lightness": 1
                      }
                  ]
              },
              {
                  "featureType": "road.arterial",
                  "elementType": "geometry.fill",
                  "stylers": [
                      {
                          "color": "#000000"
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
    created(){
    },
    beforeDestroy(){
    },
    destroyed(){
    },
    mounted() {
      $('#plans-item').fullpage({
        menu: '#menu',
        scrollingSpeed: 1000,
        navigation: true,
        scrollOverflow: true,
        navigationPosition: 'right',
        fixedElements:'.plan-back',
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
.plan-back-icon{
  position: fixed;
  top: 60px;
  right: 30px;
  color:#ee4d4d;
  opacity: .9;    
  height: 32px;
  width: 32px;
  background: #fff;
  border-radius: 50%;
  text-align: center;
  padding-top: 6px;
  border: 2px solid #ee4d4d;
  .fa{
    font-size: 28px;
  }
}
.plans{
  .section{
    .plans-map{
      // position:absolute;
      // top:0px;
      // left:0;
      width:100vw;
      height:calc(100vh - 100px);
      overflow-y: hidden;
    }
  }
  .inner-section{    
    padding:30px; 
    margin-left:auto;
    margin-right:auto;
    max-width: 960px;
    width: 80%;
    .plans-content{
      .h5{
        margin-top: 20px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>