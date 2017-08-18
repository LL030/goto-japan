<template>
  <div v-bind:id=" 'map-' + id" class="map">
  </div>
</template>
<script>
import { loaded } from '../../google_config.js';
import '../../common/css/bootstrap/bootstrap.scss';
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
    zoom:{
      type: Number,
      default:19
    },
    travelMode:{
      type: String,
      default:'WALKING'
    },
  },
  data () {
    return {
      mapMarker:{
        type:Object,
        default:null
      },
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
          icon: 'http://feversoul.com/jp/src/assets/img/maps-and-flags.svg'
        },
        food:{
          icon: 'http://feversoul.com/jp/src/assets/img/sushi-c.svg'
        },
        stationB:{
          icon: 'http://feversoul.com/jp/src/assets/img/placeholder_b.svg'
        },
        stationPoint:{
          icon: 'http://feversoul.com/jp/src/assets/img/bus.svg'
        }
      };
      this.map = new google.maps.Map(document.getElementById('map-' + this.id), {
          center: this.center,
          zoom: this.zoom,
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


      if(this.markers){
        for (var i = 0; i < this.markers.length; ++i) {
          console.log( this.markers[i]['loc']);
          this.mapMarker[i] = new google.maps.Marker({
            position: this.markers[i]['loc'],
            //label: restaurants[i]['title'],
            icon:icons[this.icon].icon,
            map: this.map
          });
        }
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
          travelMode: travelMode
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
.map{
  width: 100%;
  height: 100%;
}
</style>
