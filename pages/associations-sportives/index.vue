<template lang="html">
  <div class="">
    <div class="p-12 bg-blue-50">
      <Container>
        <Search/>
        <div class="overflow-hidden h-1 mb-4 text-xs flex rounded bg-blue-200">
          <div :style="`width:${currentPourcent}%`" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
        </div>
        <p class="text-blue-600">{{clubsTrouves}} clubs trouvés</p>
      </Container>
    </div>

    <div class="bg-gray-50 py-12">
      <Container>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:p-0 place-items-stretch">

          <div class="flex-1 items-center justify-center" v-for="(sport,i) in resultats" :key="i">
            <nuxt-link class="h-full flex flex-col rounded-xl overflow-hidden" :to="`/associations-sportives/${$options.filters.slug(city)}/${$options.filters.slug(sport.sport)}`">
              <div class="flex-1 bg-transparent flex flex-col justify-between">
                <p class="text-md tracking-wide font-extrabold text-blue-500 p-4 py-2 pl-1 capitalize">
                  {{sport.sport}} - {{sport.resultats.length}} <span v-if="sport.resultats.length == 1">club</span><span v-else>clubs</span>
                </p>
                <div class="flex-1 bg-white rounded-t-xl p-6">
                  <div class="grid grid-cols-1 gap-2 place-items-stretch relative">
                    <div class="rounded-md bg-gray-50 p-4" v-if="i < 3" v-for="(club,i) in sport.resultats" :key="`club-${i}`">
                      <span class="text-gray-400 text-sm font-medium">{{club.distance.toFixed(2)*1000}} mètres</span>
                      <div class="text-gray-500 font-bold">
                        {{club.name}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
      </Container>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import slug from 'slug'

const colors = [
  'blue', 'gray', 'pink', 'red', 'green'
]

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(lat1, lon1, lat2, lon2)
{
  var R = 6371; // km
  var dLat = toRad(lat2-lat1);
  var dLon = toRad(lon2-lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value)
{
  return Value * Math.PI / 180;
}

export default {
  data() {
    return {
      resultats: [],
      searchedSport: null,
      sports: [],
      currentPourcent: 0,
      continueToGetResult: true,
      city: null,
      clubsTrouves: 0,
      distanceChanged: false,
    }
  },
  computed: {
    distance() {
      return this.$store.state.app.distance
    }
  },
  async mounted() {

    let location = this.$store.state.location.coordinate
    let searchResult = this.$store.state.sports.resultats
    // console.table({
    //   location: {name: "adresse recherchée",'result': location.formatted_address},
    //   test: {name: "est ce quil y a deja des resultats", 'result': searchResult.length},
    // }, ['name', 'result'])

    if(location.formatted_address != undefined && searchResult.length == 0) {
      this.getResults()
    }else if(location.formatted_address != undefined && searchResult.length != 0){
      this.continueToGetResult = true
      this.city = this.getRealCity(location)
      this.resultats = searchResult
      this.currentPourcent = 100
      for (let result of searchResult) {
        this.clubsTrouves+= result.resultats.length
      }
    }

    this.$nuxt.$on("changeLocation", () => {
      this.$store.commit('sports/resetResult')
      this.getResults()
    });

    this.$nuxt.$on("changeDistance", () => {
      this.distanceChanged = true
      this.$nuxt.$emit('stopLoopPlease')
    });

    this.$nuxt.$on("jaifini", () => {
      this.continueToGetResult = true
      // if(this.changedDistance == true)
      this.getResults()
    });

    this.$nuxt.$on("stopLoopPlease", () => {
      this.continueToGetResult = false
    });

  },
  methods: {
    async getResults() {
      this.resultats = []
      this.clubsTrouves = 0

      let location = this.$store.state.location.coordinate
      let sports = this.$store.state.sports.sports
      let blacklist = this.$store.state.blackSports.sports
      let ville = this.getRealCity(location)

      this.sports = sports
      this.city = ville

      // console.table({
      //   location: {name: "adresse recherchée",'result': location.formatted_address},
      //   sports: {name: "sports",'result': this.sports},
      //   ville: {name: "ville",'result': this.city},
      // }, ['name', 'result'])

      let geometry = {
        lat: location.geometry.location.lat(),
        lng: location.geometry.location.lng(),
      }

      let data
      let kmsSearched = this.distance / 1000
      let radius = kmsSearched * 100

      for (let sport of sports) {

        this.searchedSport = sport
        let currentSportIndex = sports.indexOf(sport) + 1
        this.currentPourcent = (currentSportIndex/sports.length) * 100

        // si je suis déjà rendu sur la page suivante j'arrête la boucle
        if(this.continueToGetResult == false) {
          this.$nuxt.$emit('jaifini')
          return;
        }

        let data
        try {
          data = await this.$axios.$get(`/googleApiMap/maps/api/place/textsearch/json?location=${geometry.lat},${geometry.lng}&radius=${radius}&query=Club%20${sport}%20${ville}&key=MYKEY`);
        } catch (e) {

        } finally {

          let distance
          if(data.status == 'OK' && data.results.length > 0) {

            let resultats = []
            for (let club of data.results) {

              distance = calcCrow(geometry.lat,geometry.lng,club.geometry.location.lat,club.geometry.location.lng)

              if(distance <= kmsSearched){
                club.distance = distance

                if(club.types[0] == 'point_of_interest'){
                  club.nameSanitized = club.name.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                  let wordsSport = club.nameSanitized.split(' ')

                  let hasAnotherSport = false
                  for (let sportWord of sports) {

                    let resultIndex = (wordsSport.indexOf(sportWord.toLowerCase()) > -1)
                    let resultIndexAccent = (wordsSport.indexOf(sportWord.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()) > -1)
                    if(sport != sportWord && (resultIndex == true || resultIndexAccent == true)) {
                      hasAnotherSport = true
                    }
                  }
                  let hasBlacklisted = false
                  for( let blacklistSport of blacklist) {
                    let resultBlacklist = (wordsSport.indexOf(blacklistSport.toLowerCase()) > -1)
                    if(resultBlacklist == true){
                      hasBlacklisted = true
                    }
                  }
                  if(!hasAnotherSport && !this.hasBlackTypes(club) && !hasBlacklisted) resultats.push(club)
                }

              }
            }

            if(resultats.length > 0) {
              let result = {
                sport: sport.toLowerCase(),
                sportslug: slug(sport),
                resultats: resultats,
              }
              this.clubsTrouves+= resultats.length
              this.resultats.push(result)
              this.$store.commit('sports/addResult', result)
            }
          }
        }
      }
      this.searchedSport = null
      this.continueToGetResult = true
      // this.changedDistance == false
    },
    hasBlackTypes(adresse) {
      let types = ['store', 'clothing_store']
      for (var i = 0; i < adresse.types.length; i++) {
        if(types.indexOf(adresse.types[i]) > -1) {
          return true
        }
      }
      return false
    },
    getRealCity(place) {
      for (let component of place.address_components) {
        if(component.types[0] == 'locality') return component.long_name
      }
      return false
    },
  }
}
</script>

<style lang="css" scoped>
</style>
