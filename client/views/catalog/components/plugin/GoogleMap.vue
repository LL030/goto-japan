<template>
  <div id="map">
  </div>
</template>
<script>
import { loaded } from '../../google_config.js';
import '../../../common/css/bootstrap/bootstrap.scss';
export default {
  name: 'map',
  props: {
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
    styles:{
      type: Array,
      default:null
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
    travelMode:{
      type: String,
      default:'WALKING'
    },
  },
  data () {
    return {
      map: null,
      mapMarker:{
        type:Object,
        default:null
      },
      directionsDisplay:null,
      directionsService:[null]
    }
  },
  created: function () {
    return loaded.then(() => {
      // getting the DOM element where to create the map
      console.log(this.from);
      var icons = {
        info: {
          icon: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-location_1.svg'
        },
        station:{
          icon: 'http://feversoul.com/jp/src/assets/img/maps-and-flags.svg'
        },
        stationB:{
          icon: 'http://feversoul.com/jp/src/assets/img/placeholder_b.svg'
        },
        stationPoint:{
          icon: 'http://feversoul.com/jp/src/assets/img/bus.svg'
        }
      };
      var center = {lat: 35.7075734, lng: 139.7320827};
      var tokyo = {lat: 35.7075734, lng: 139.7320827};
      var kamakura = {lat: 35.3186961,lng: 139.5459878};
      var hakone = {lat: 35.233541,lng: 139.1080359};
      var nagoya = {lat: 35.184044,lng: 136.9104946};
      var kyoto = {lat: 35.0070798,lng: 135.7707381};
      var nara = {lat: 34.688235,lng: 135.7997868};
      this.map = new google.maps.Map(document.getElementById('map'), {
          center: this.center,
          zoom: 12,
          scrollwheel: false,
          navigationControl: false,
          mapTypeControl: false,
          scaleControl: false,
          styles:this.styles,
          backgroundColor: this.backgroundColor,
          mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                    'styled_map']
          }
      });
      console.log('this.marker');
      console.log(this.markers);
      if(this.markers){
        for (var i = 0; i < this.markers.length; ++i) {
          console.log( this.markers[i]['loc']);
          this.mapMarker[i] = new google.maps.Marker({
            position: this.markers[i]['loc'],
            //label: restaurants[i]['title'],
            icon:icons['station'].icon,
            map: this.map
          });
        }
      }
      this.directionsDisplay = new google.maps.DirectionsRenderer();
      this.directionsDisplay.setMap(this.map);
      this.directionsDisplay.setOptions( { suppressMarkers: true } );
      this.directionsService = new google.maps.DirectionsService();
      if(this.waypts){
        this.calcRoute(
          this.from,
          this.to,
          this.waypts,
          this.directionsDisplay,
          this.directionsService,
          this.travelMode
        );
      }
    });
  },
  methods: {
    calcRoute:function(from,to,waypts,directionsDisplay,directionsService,travelMode) {
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
          optimizeWaypoints: true,
          travelMode: 'DRIVING'
      };
      directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
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
    }
  }
}
</script>
<style lang="scss">
#map{
  width: 100vw;
  height: 100vh;
}
</style>
