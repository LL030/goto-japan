<template>
  <div class="content plans" id="plans-container">
      <router-link to="/" class="plan-back"><i class="fa fa-undo plan-back-icon" aria-hidden="true"></i></router-link>
    <div id="plans-item" v-if="day">
      <div class="section">
        <div class="inner-section-fixed">
          <div class="plans-map large"  v-bind:style="{backgroundSize:'cover',backgroundImage:'linear-gradient(to right, rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url('+ plans[day -1]['bgimg'] +')'}" v-bind:id="1">
            <GoogleMap :id='1' :zoom='14' :center='plans[day -1]["markers"][0]["loc"]' :from='plans[day -1]["from"]' :to='plans[day -1]["to"]' :waypts='plans[day -1]["waypts"]' :markers='plans[day -1]["markers"]'>
            </GoogleMap>
          </div>
          <div style="width:100vw;height:90px;position:relative">
            <img v-on:click="goDown" class="go-down" src="https://image.flaticon.com/icons/svg/275/275108.svg">
          </div>
        </div>
      </div>
      <div class="section" id="plans-content-container">
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
  	                 築地市場新鮮海產 「築地站」<br/>
                     <div style="width: 100%;height:300px;margin:20px auto">
                      <GoogleMap :id='3' 
                      :styles='styles' 
                      :from='plans[day -1]["markers"][2]["loc"]["lat"] + "," + plans[day -1]["markers"][2]["loc"]["lng"]' 
                      :to='plans[day -1]["markers"][3]["loc"]["lat"] + "," + plans[day -1]["markers"][3]["loc"]["lng"]'
                      :markers='plans[day -1]["markers"].slice(2,4)'>
                     </GoogleMap>
                     </div>
  	                 月島漫步<br/>
                     <div style="width: 100%;height:300px;margin:20px auto">
                      <GoogleMap :id='4' 
                      :styles='styles' 
                      :from='plans[day -1]["markers"][3]["loc"]["lat"] + "," + plans[day -1]["markers"][3]["loc"]["lng"]' 
                      :to='plans[day -1]["markers"][4]["loc"]["lat"] + "," + plans[day -1]["markers"][4]["loc"]["lng"]' 
                      :markers='plans[day -1]["markers"].slice(3,5)'>
                     </GoogleMap>
                     </div>
  	                 台場高達，自由女神，睇彩虹橋,大江戶溫泉物語<br/> 
                     <div style="width: 100%;height:300px;margin:20px auto">
                      <GoogleMap :id='5' 
                      :styles='styles' 
                      :from='plans[day -1]["markers"][5]["loc"]["lat"] + "," + plans[day -1]["markers"][5]["loc"]["lng"]' 
                      :to='plans[day -1]["markers"][7]["loc"]["lat"] + "," + plans[day -1]["markers"][7]["loc"]["lng"]' 
                      :waypts='[
                        {
                          location:plans[day -1]["markers"][6]["loc"]["lat"] + "," + plans[day -1]["markers"][6]["loc"]["lng"],
                          stopover:true
                        }
                      ]'
                      :markers='plans[day -1]["markers"].slice(5,8)'>
                     </GoogleMap>
                     </div>
  	              </div>
                  <div v-if="day == 3">
                     幕張駅 → 日本千葉幕張展覽館 → 千葉IBM附近小餐館<br/>
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
                      門前仲町 → やきとり「庄助」 → 天水宮  → 天ぷら「中山」<br/>
                     <div style="width: 100%;height:300px;margin:20px auto">
                      <GoogleMap :id='3' 
                      :styles='styles' 
                      :from='plans[day -1]["markers"][4]["loc"]["lat"] + "," + plans[day -1]["markers"][4]["loc"]["lng"]' 
                      :to='plans[day -1]["markers"][7]["loc"]["lat"] + "," + plans[day -1]["markers"][7]["loc"]["lng"]' 
                      :waypts='[
                        {
                          location:plans[day -1]["markers"][5]["loc"]["lat"] + "," + plans[day -1]["markers"][5]["loc"]["lng"],
                          stopover:true
                        },
                        {
                          location:plans[day -1]["markers"][6]["loc"]["lat"] + "," + plans[day -1]["markers"][6]["loc"]["lng"],
                          stopover:true
                        }
                      ]'
                      :markers='plans[day -1]["markers"].slice(4,8)'>
                     </GoogleMap>
                     </div>
                     秋葉原駅 → Yodobashi Akiba → 神田万世橋 → 秋葉原電器街 → 秋葉原UDX → 2k540 AKI-OKA ARTISAN<br/>
                     <div style="width: 100%;height:300px;margin:20px auto">
                      <GoogleMap :id='4' 
                      :styles='styles' 
                      :from='plans[day -1]["markers"][8]["loc"]["lat"] + "," + plans[day -1]["markers"][8]["loc"]["lng"]' 
                      :to='plans[day -1]["markers"][12]["loc"]["lat"] + "," + plans[day -1]["markers"][13]["loc"]["lng"]' 
                      :waypts='[
                        {
                          location:plans[day -1]["markers"][9]["loc"]["lat"] + "," + plans[day -1]["markers"][9]["loc"]["lng"],
                          stopover:true
                        },
                        {
                          location:plans[day -1]["markers"][10]["loc"]["lat"] + "," + plans[day -1]["markers"][10]["loc"]["lng"],
                          stopover:true
                        },
                        {
                          location:plans[day -1]["markers"][11]["loc"]["lat"] + "," + plans[day -1]["markers"][11]["loc"]["lng"],
                          stopover:true
                        },
                        {
                          location:plans[day -1]["markers"][11]["loc"]["lat"] + "," + plans[day -1]["markers"][12]["loc"]["lng"],
                          stopover:true
                        }
                      ]'
                      :markers='plans[day -1]["markers"].slice(8,14)'>
                     </GoogleMap>
                     </div>
                     2k540 AKI-OKA ARTISAN → ちゃんこ割烹大内<br/>
                     <div style="width: 100%;height:300px;margin:20px auto">
                      <GoogleMap :id='5' 
                      :styles='styles' 
                      :from='plans[day -1]["markers"][13]["loc"]["lat"] + "," + plans[day -1]["markers"][13]["loc"]["lng"]' 
                      :to='plans[day -1]["markers"][14]["loc"]["lat"] + "," + plans[day -1]["markers"][14]["loc"]["lng"]' 
                      :markers='plans[day -1]["markers"].slice(13,15)'>
                     </GoogleMap>
                     </div>
                  </div>
                  <div v-if="day == 4">
                     豊島園駅 → 満天堂 → 吉卜力美術館<br/>
                     <div style="width: 100%;height:300px;margin:20px auto">
                      <GoogleMap :id='2' 
                      :styles='styles' 
                      :from='plans[day -1]["markers"][1]["loc"]["lat"] + "," + plans[day -1]["markers"][1]["loc"]["lng"]' 
                      :to='plans[day -1]["markers"][3]["loc"]["lat"] + "," + plans[day -1]["markers"][3]["loc"]["lng"]' 
                      :waypts='[
                        {
                          location:plans[day -1]["markers"][2]["loc"]["lat"] + "," + plans[day -1]["markers"][2]["loc"]["lng"],
                          stopover:true
                        }
                      ]'
                      :markers='plans[day -1]["markers"].slice(1,4)'>
                     </GoogleMap>
                     </div>
                      鷺ノ宮駅 → みやこや → Nakano  → 平和苑（焼肉）<br/>
                     <div style="width: 100%;height:300px;margin:20px auto">
                      <GoogleMap :id='3' 
                      :styles='styles' 
                      :from='plans[day -1]["markers"][4]["loc"]["lat"] + "," + plans[day -1]["markers"][4]["loc"]["lng"]' 
                      :to='plans[day -1]["markers"][7]["loc"]["lat"] + "," + plans[day -1]["markers"][7]["loc"]["lng"]' 
                      :waypts='[
                        {
                          location:plans[day -1]["markers"][5]["loc"]["lat"] + "," + plans[day -1]["markers"][5]["loc"]["lng"],
                          stopover:true
                        },
                        {
                          location:plans[day -1]["markers"][6]["loc"]["lat"] + "," + plans[day -1]["markers"][6]["loc"]["lng"],
                          stopover:true
                        }
                      ]'
                      :markers='plans[day -1]["markers"].slice(4,8)'>
                      </GoogleMap>
                      </div>
                      沼袋駅 → J-WORLD TOKYO → 貓咪的休憩所299  → 餃子莊 ムロ<br/>
                     <div style="width: 100%;height:300px;margin:20px auto">
                        <GoogleMap :id='4' 
                        :styles='styles' 
                        :from='plans[day -1]["markers"][8]["loc"]["lat"] + "," + plans[day -1]["markers"][8]["loc"]["lng"]' 
                        :to='plans[day -1]["markers"][11]["loc"]["lat"] + "," + plans[day -1]["markers"][11]["loc"]["lng"]' 
                        :waypts='[
                          {
                            location:plans[day -1]["markers"][9]["loc"]["lat"] + "," + plans[day -1]["markers"][9]["loc"]["lng"],
                            stopover:true
                          },
                          {
                            location:plans[day -1]["markers"][10]["loc"]["lat"] + "," + plans[day -1]["markers"][10]["loc"]["lng"],
                            stopover:true
                          }
                        ]'
                        :markers='plans[day -1]["markers"].slice(8,12)'>
                        </GoogleMap>
                     </div>
                  </div>
                  <div v-if="day == 5">
                    恵比寿駅 → さいき居酒屋 <br/>
                     <div style="width: 100%;height:300px;margin:20px auto">
                      <GoogleMap :id='2' 
                      :styles='styles' 
                      :from='plans[day -1]["markers"][1]["loc"]["lat"] + "," + plans[day -1]["markers"][1]["loc"]["lng"]' 
                      :to='plans[day -1]["markers"][2]["loc"]["lat"] + "," + plans[day -1]["markers"][2]["loc"]["lng"]' 
                      :markers='plans[day -1]["markers"].slice(1,3)'>
                     </GoogleMap>
                     </div>
                    居酒屋 →【中目黑】目黑川閒逛 + 文青個性小店  → 【自由之丘】美食甜點下午茶 + 生活雜貨超好逛 + 小威尼斯打卡拍照<br/>
                     <div style="width: 100%;height:300px;margin:20px auto">
                      <GoogleMap :id='3' 
                      :styles='styles' 
                      :from='plans[day -1]["markers"][2]["loc"]["lat"] + "," + plans[day -1]["markers"][2]["loc"]["lng"]' 
                      :to='plans[day -1]["markers"][4]["loc"]["lat"] + "," + plans[day -1]["markers"][4]["loc"]["lng"]' 
                      :waypts='[
                        {
                          location:plans[day -1]["markers"][3]["loc"]["lat"] + "," + plans[day -1]["markers"][3]["loc"]["lng"],
                          stopover:true
                        }
                      ]'
                      :markers='plans[day -1]["markers"].slice(2,5)'>
                     </GoogleMap>
                     </div>
                     中目黑 → お好み焼きと鉄板焼HIROKI → 涉谷101<br/>
                     <div style="width: 100%;height:300px;margin:20px auto">
                      <GoogleMap :id='4' 
                      :styles='styles' 
                      :from='plans[day -1]["markers"][4]["loc"]["lat"] + "," + plans[day -1]["markers"][4]["loc"]["lng"]' 
                      :to='plans[day -1]["markers"][6]["loc"]["lat"] + "," + plans[day -1]["markers"][6]["loc"]["lng"]' 
                      :waypts='[
                        {
                          location:plans[day -1]["markers"][5]["loc"]["lat"] + "," + plans[day -1]["markers"][5]["loc"]["lng"],
                          stopover:true
                        }
                      ]'
                      :markers='plans[day -1]["markers"].slice(4,7)'>
                     </GoogleMap>
                     </div>
                     涉谷101 → 居酒屋魚貞 → ミヤザキ商店 燒雞串 <br/>
                     <div style="width: 100%;height:300px;margin:20px auto">
                      <GoogleMap :id='5' 
                      :styles='styles' 
                      :from='plans[day -1]["markers"][6]["loc"]["lat"] + "," + plans[day -1]["markers"][6]["loc"]["lng"]' 
                      :to='plans[day -1]["markers"][8]["loc"]["lat"] + "," + plans[day -1]["markers"][8]["loc"]["lng"]' 
                      :waypts='[
                        {
                          location:plans[day -1]["markers"][7]["loc"]["lat"] + "," + plans[day -1]["markers"][7]["loc"]["lng"],
                          stopover:true
                        }
                      ]'
                      :markers='plans[day -1]["markers"].slice(6,9)'>
                     </GoogleMap>
                     </div>
                    ミヤザキ商店 → 君の名は朝聖<br/>
                     <div style="width: 100%;height:300px;margin:20px auto">
                      <GoogleMap :id='6' 
                      :styles='styles' 
                      :from='plans[day -1]["markers"][8]["loc"]["lat"] + "," + plans[day -1]["markers"][8]["loc"]["lng"]' 
                      :to='plans[day -1]["markers"][12]["loc"]["lat"] + "," + plans[day -1]["markers"][12]["loc"]["lng"]' 
                      :waypts='[
                        {
                          location:plans[day -1]["markers"][9]["loc"]["lat"] + "," + plans[day -1]["markers"][9]["loc"]["lng"],
                          stopover:true
                        },
                        {
                          location:plans[day -1]["markers"][10]["loc"]["lat"] + "," + plans[day -1]["markers"][10]["loc"]["lng"],
                          stopover:true
                        },
                        {
                          location:plans[day -1]["markers"][11]["loc"]["lat"] + "," + plans[day -1]["markers"][11]["loc"]["lng"],
                          stopover:true
                        }
                      ]'
                      :markers='plans[day -1]["markers"].slice(8,13)'>
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
        content:'沼袋駅',
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
        title:'さいき居酒屋',
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
      {location:'35.662613,139.780453',stopover:true},
      {location:'35.627843,139.771823',stopover:true},
      {location:'35.625122,139.775450',stopover:true},
      {location:'35.615491,139.777509',stopover:true}
    ],
    markers:[
      {loc:{lat:35.674890,lng:139.759605},name:'日比谷駅'},
      {loc:{lat:35.671839,lng:139.755146},name:'日比谷公園'},
      {loc:{lat:35.664880,lng:139.762487},name:'Caretta 46F'},
      {loc:{lat:35.665486,lng:139.770667},name:'築地市場'},
      {loc:{lat:35.662613,lng:139.780453},name:'月島駅'},
      {loc:{lat:35.627843,lng:139.771823},name:'台場自由女神'},
      {loc:{lat:35.625122,lng:139.775450},name:'台場高達'},
      {loc:{lat:35.615491,lng:139.777509},name:'大江戶溫泉物語'},
      {loc:{lat:35.624718,lng:139.781184},name:'青海駅'}
    ],
    bgimg:'https://storage.googleapis.com/ay-image-upload/1493884228054_tokyo_odaibabanner.jpg'
  },
  {
    title:"Day 3 東京都 - 千葉GameShow - 秋葉原 ",
    from:'35.7243000,139.819456',
    to:'35.7243000,139.819456',
    waypts:[
      {location:'35.648190,140.041920',stopover:true},
      {location:'35.647451,140.035231',stopover:true},
      {location:'35.652932,140.043397',stopover:true},
      {location:'35.673104,139.795040',stopover:true},
      {location:'35.6719523,139.7973684',stopover:true},
      {location:'35.683663,139.785063',stopover:true},
      {location:'35.6841063,139.7825141',stopover:true},
      {location:'35.698218,139.772884',stopover:true},
      {location:'35.698713,139.774761',stopover:true},
      {location:'35.697270,139.770080',stopover:true},
      {location:'35.699958,139.770191',stopover:true},
      {location:'35.701078,139.772879',stopover:true},
      {location:'35.703280,139.774108',stopover:true},
      {location:'35.693596,139.793093',stopover:true}
    ],
    markers:[
      {loc:{lat:35.7243000,lng:139.819456},name:'BNB'},
      {loc:{lat:35.648190,lng:140.041920},name:'幕張駅'},
      {loc:{lat:35.647451,lng:140.035231},name:'日本千葉幕張展覽館'},
      {loc:{lat:35.652932,lng:140.043397},name:'千葉IBM附近小餐館',icon:'food'},
      {loc:{lat:35.673104,lng:139.795040},name:'門前仲町'},
      {loc:{lat:35.6719523,lng:139.7973684},name:'やきとり「庄助」',icon:'food'},
      {loc:{lat:35.683663,lng:139.785063},name:'天水宮'},
      {loc:{lat:35.6841063,lng:139.7825141},name:'天ぷら「中山」',icon:'food'},
      {loc:{lat:35.698218,lng:139.772884},name:'秋葉原駅'},
      {loc:{lat:35.697270,lng:139.770080},name:'神田万世橋'},
      {loc:{lat:35.699958,lng:139.770191},name:'秋葉原電器街'},
      {loc:{lat:35.701078,lng:139.772879},name:'秋葉原UDX'},
      {loc:{lat:35.703280,lng:139.774108},name:'2k540 AKI-OKA ARTISAN'},
      {loc:{lat:35.698713,lng:139.774761},name:'Yodobashi Akiba'},
      {loc:{lat:35.693596,lng:139.793093},name:'ちゃんこ割烹大内',icon:'food'}
    ],
    bgimg:'https://storage.googleapis.com/ay-image-upload/1493884228054_tokyo_odaibabanner.jpg'
  },
  {
    title:"Day 4 三鷹、練馬區、中野區、新宿",
    from:'35.7243000,139.819456',
    to:'35.7243000,139.819456',
    waypts:[
      {location:'35.742090,139.649190',stopover:true},
      {location:'35.7437489,139.6460803',stopover:true},
      {location:'35.696238,139.570432',stopover:true},
      {location:'35.722620,139.639886',stopover:true},
      {location:'35.7236581,139.6377397',stopover:true},
      {location:'35.709636,139.665672',stopover:true},
      {location:'35.71867813,139.660121',stopover:true},
      {location:'35.719149,139.664801',stopover:true},
      {location:'35.728813,139.720004',stopover:true},
      {location:'35.729281,139.715974',stopover:true},
      {location:'35.7110048,139.7025377',stopover:true}
    ],
    markers:[
      {loc:{lat:35.7243000,lng:139.819456},name:'BNB'},
      {loc:{lat:35.742090,lng:139.649190},name:'豊島園駅'},
      {loc:{lat:35.7437489,lng:139.6460803},name:'満天堂',icon:'food'},
      {loc:{lat:35.696238,lng:139.570432},name:'吉卜力美術館'},
      {loc:{lat:35.722620,lng:139.639886},name:'鷺ノ宮駅'},
      {loc:{lat:35.7236581,lng:139.6377397},name:'みやこや',icon:'food'},
      {loc:{lat:35.709636,lng:139.665672},name:'Nakano Broadway 玩具街'},
      {loc:{lat:35.71867813,lng:139.660121},name:'平和苑（焼肉）',icon:'food'},
      {loc:{lat:35.719149,lng:139.664801},name:'沼袋駅'},
      {loc:{lat:35.728813,lng:139.720004},name:'J-WORLD TOKYO'},
      {loc:{lat:35.729281,lng:139.715974},name:'貓咪的休憩所299'},
      {loc:{lat:35.7110048,lng:139.7025377},name:'餃子莊 ムロ',icon:'food'}
    ],
    bgimg:'https://storage.googleapis.com/ay-image-upload/1493884228054_tokyo_odaibabanner.jpg'
  },
  {
    title:"Day 5 澀谷、目黑、君の名は",
    from:'35.647156,139.709739',
    to:'35.670399,139.717826',
    waypts:[
      {location:'35.6479085,139.708367',stopover:true},
      {location:'35.644288,139.699096',stopover:true},
      {location:'35.609208,139.669361',stopover:true},
      {location:'35.6600649,139.6677612',stopover:true},
      {location:'35.661252,139.696393',stopover:true},
      {location:'35.67792,139.6747974',stopover:true},
      {location:'35.6909603,139.6632615',stopover:true},
      {location:'35.686564,139.725334',stopover:true},
      {location:'35.682154,139.733970',stopover:true},
      {location:'35.680060,139.720320',stopover:true},
      {location:'35.6710086,139.7129795',stopover:true}
    ],
    markers:[
      {loc:{lat:35.670399,lng:139.717826},name:'外苑前駅'},
      {loc:{lat:35.647156,lng:139.709739},name:'恵比寿駅'},
      {loc:{lat:35.6479085,lng:139.708367},name:'さいき',icon:'food'},
      {loc:{lat:35.644288,lng:139.699096},name:'中目黑'},
      {loc:{lat:35.609208,lng:139.669361},name:'自由之丘'},
      {loc:{lat:35.6600649,lng:139.6677612},name:'お好み焼きと鉄板焼HIROKI',icon:'food'},
      {loc:{lat:35.661252,lng:139.696393},name:'澀谷101'},
      {loc:{lat:35.67792,lng:139.6747974},name:'居酒屋魚貞',icon:'food'},
      {loc:{lat:35.6909603,lng:139.6632615},name:'ミヤザキ商店',icon:'food'},
      {loc:{lat:35.686564,lng:139.725334},name:'四谷二丁目(君の名は)'},
      {loc:{lat:35.682154,lng:139.733970},name:'須賀神社(君の名は)'},
      {loc:{lat:35.680060,lng:139.720320},name:'信濃町站(君の名は)'},
      {loc:{lat:35.6710086,lng:139.7129795},name:'シャンウェイ',icon:'food'}
    ],
    bgimg:'https://storage.googleapis.com/ay-image-upload/1493884228054_tokyo_odaibabanner.jpg'
  }
];
for (var i = 0; i < restaurants.length; ++i) {
  for (var p = 0; p < plans.length; ++p) {
    //plans[p]['markers'].push({loc:restaurants[i]['loc'],title:restaurants[i]['title'],icon:'food',content:restaurants[i]['content']});
  }
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
          map:[a,b,c,d],
          waypts:plans[0]['waypts'],
          center: {lat: 35.7075734, lng: 139.7320827},
          markers: plans[0]['markers'],
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
    methods: {
      makeItRain() {
        //clear out everything
        $('.rain').empty();

        var increment = 0;
        var drops = "";
        var backDrops = "";

        while (increment < 100) {
          //couple random numbers to use for various randomizations
          //random number between 98 and 1
          var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
          //random number between 5 and 2
          var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
          //increment
          increment += randoFiver;
          //add in a new raindrop with various randomizations to certain CSS properties
          drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
          backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
        }

        $('.rain.front-row').append(drops);
        $('.rain.back-row').append(backDrops);
      },
      goDown(){
        $.fn.fullpage.moveSectionDown();
      }
    },
    mounted() {
      $('#plans-item').fullpage({
        menu: '#menu',
        scrollingSpeed: 1000,
        navigation: true,
        scrollOverflow: true,
        navigationPosition: 'right',
        fixedElements:'.plan-back',
        normalScrollElements:'.plans-map',
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
    color: #fff;
    background: rgba(0,0,0,0.5);
    .plans-content{
      .h5{
        margin-top: 20px;
        margin-bottom: 20px;
      }
    }
  }
}

#plans-container {
  height: 100%;
  margin: 0;
  overflow: hidden;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.3)),url('https://farm4.staticflickr.com/3756/14312253575_5220fbdbdc_h.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
}

</style>