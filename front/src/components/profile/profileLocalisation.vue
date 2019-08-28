<template>
  <div class="tile is-parent">

    <article class="tile is-child box" :class="isMe ? 'has-background-white-ter' : 'white'">
      <p class="title">Ma localisation&nbsp;<font-awesome-icon icon="map-marker-alt" size="1x" color="rgba(141, 196, 73, 1)"/></p>
      <p class="subtitle"></p>
      <div class="content">
        <div class="hello is-size-7">
          <h1>{{ this.userInfos.city }}</h1>
          <div class="box" id="myMap"></div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>

  export default {
    name: 'ProfileLocalisation',
    props: {
      userInfos: null,
      isMe: null
    },
    data () {
      return {
        map: null,
        positionUser: null,
        mapMarker: null,
      }},
    methods: {
      showMap () {
        this.positionUser = {
          lat: this.userInfos.latitude,
          lng: this.userInfos.longitude
        }
        this.map = new google.maps.Map(document.getElementById('myMap'), {
          center: this.positionUser,
          scrollwheel: false,
          zoom: 15
        })
        this.mapMarker = new google.maps.Marker({position: this.positionUser, map: this.map});
      },
    },
    mounted () {
      this.showMap()
    }
  }
</script>

<style scoped>
  #myMap {
    height:300px;
    width: 100%;
  }
</style>
