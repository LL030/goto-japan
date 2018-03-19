<template>
  <div v-bind:id=" 'map-' + id" class="map" v-bind:data-ii="panTo">
  </div>
</template>
<script>
import { loaded } from '../../google_config.js';
export default {
  props: {
    id:0,
    center: {
      type: Object,
      default: null
    },
    from: {
      type: String,
      default: null
    },
    to: {
      type: String,
      default: null
    },
    markers:{
      type: Array,
      default: null
    },
    icon:{
      type: String,
      default: 'point'
    },
    styles:{
      type: Array,
      default:[
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
          ]
    },
    waypts:{
      type:Array,
      default:null,
    },
    drections:{
      type:Object,
      default:null
    },
    backgroundColor:{
      type: String,
      default:'hsla(0, 0%, 0%, 0)'
    },
    zoom:{
      type: Number,
      default:19
    },
    travelMode:{
      type: String,
      default:'WALKING'
    },
    preViewport:{
      type: String,
      default:null
    },
    panTo:{
      type:Object,
      default:null
    },
  },
  data () {
    return {
      mapMarker:{
        type:Object,
        default:null
      },
      infowindow:[],
      map:[],
      directionsDisplay:[],
      directionsService:[]
    }
  },
  created: function () {
    return loaded.then(() => {
      // getting the DOM element where to create the map
      var icons = {
        point:{
          icon: 'http://www.pilakuma.com/jpt/src/assets/img/maps-and-flags.svg'
        },
        food:{
          icon: 'http://www.pilakuma.com/jpt/src/assets/img/sushi-c.svg'
        },
        stationB:{
          icon: 'http://www.pilakuma.com/jpt/src/assets/img/placeholder_b.svg'
        },
        stationPoint:{
          icon: 'http://www.pilakuma.com/jpt/src/assets/img/bus.svg'
        }
      };
      this.map = new google.maps.Map(document.getElementById('map-' + this.id), {
          center: this.center,
          zoom: this.zoom,
          scrollwheel: false,
          navigationControl: true,
          mapTypeControl: false,
          scaleControl: true,
          styles:this.styles,
          backgroundColor: this.backgroundColor,
          mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                    'styled_map']
          }
      });
      this.infowindow = new google.maps.InfoWindow();
      if(this.markers){
        for (var i = 0; i < this.markers.length; ++i) {
          this.mapMarker[i] = new google.maps.Marker({
            position: this.markers[i]['loc'],
            // label: {
            //   text:this.markers[i]['title'],
            //   color:'#ee4d4d'
            // },
            icon:{
              url: icons[this.markers[i]['icon']?this.markers[i]['icon']:this.icon].icon,
              scaledSize: new google.maps.Size(30, 30),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(15,30),
              labelOrigin:  new google.maps.Point(40,33),
            },
            map: this.map
          });
          if(this.markers[i]['name']){
            var msg;
            if(this.markers[i]['content']){
              msg = this.markers[i]['name']+'<br/>'+this.markers[i]['content'];
            }else{
               msg = this.markers[i]['name'];
            }
            this.attachSecretMessage(
              this.mapMarker[i],
              msg,
              this.infowindow 
            );
          }
        }
      }
      console.log(this.panTo);
      if(this.panTo){
        placeMarkerAndPanTo(this.panTo['location'], this.map);
      }
      if(this.from){
        this.directionsDisplay = new google.maps.DirectionsRenderer();
        this.directionsDisplay.setMap(this.map);
        this.directionsDisplay.setOptions( { suppressMarkers: true } );
        this.directionsService = new google.maps.DirectionsService();
        this.calcRoute(
          this.from,
          this.to,
          this.waypts,
          this.directionsDisplay,
          this.directionsService,
          this.travelMode,
          this.preViewport
        );
      }
    });
  },
  watch: {
    // 如果 question 发生改变，这个函数就会运行
    panTo: function () {
      this.placeMarkerAndPanTo(this.panTo['location'], this.map);
    }
  },
  methods: {
    placeMarkerAndPanTo(latLng, map) {
      console.log(latLng);
      map.panTo(latLng);
    },
    calcRoute:function(from,to,waypts,directionsDisplay,directionsService,travelMode,preViewport) {
      var start = from;
      var end = to;
      var waypts = waypts;
      // var checkboxArray = document.getElementById('waypoints');
      // for (var i = 0; i < checkboxArray.length; i++) {
      //   if (checkboxArray.options[i].selected == true) {
      //     waypts.push({
      //         location:checkboxArray[i].value,
      //         stopover:true});
      //   }
      // }
      var request = {
          origin: start,
          destination: end,
          waypoints: waypts,
          optimizeWaypoints: false,
          travelMode: travelMode
      };
      directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          if(preViewport){
            directionsDisplay.setOptions({ preserveViewport: true })
          }
          directionsDisplay.setDirections(response);
          var route = response.routes[0];
          //var summaryPanel = document.getElementById('directions_panel');
          //summaryPanel.innerHTML = '';
          // For each route, display summary information.
          /*for (var i = 0; i < route.legs.length; i++) {
            var routeSegment = i + 1;
            summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
            summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
            summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
            summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
          }*/
        }
      });
    },
    attachSecretMessage:function(marker, secretMessage,infowindow) {
      marker.addListener('click', function() {
        console.log(infowindow);
        infowindow.setContent(secretMessage);
        infowindow.open(marker.get('map'), marker);
      });
    }
  }
}
</script>
<style lang="scss">
.map{
  width: 100%;
  height: 100%;
}
</style>
