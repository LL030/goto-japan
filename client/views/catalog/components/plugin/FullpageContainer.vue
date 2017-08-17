<template>
  <div id="fullpage">
  </div>
</template>

<script>
export default {
    /* eslint-disable no-undef */
    data () {
        return {
          map:null,
          from:'東京',
          to:'京都',
          waypts:[{location:'湘南',stopover:true},{location:'箱根',stopover:true},{location:'名古屋',stopover:true}],
          center: {lat: 35.7075734, lng: 139.7320827}
        }
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
#fullpage{
  .section{
    &:first-child{
      padding-top: 0px;
    }
    padding-top: 40px;
  }
}
</style>