<template lang="html">
  <div class="" v-if="loaded">

    <div class="p-12 bg-blue-50">
      <Container>
        <Search/>
      </Container>
    </div>

    <div class="bg-gray-50">
      <Container>

        <div v-if="resultats.length > 0" class="w-full text-center items-center w-full py-12">
          <div class="">
            <h2 class="text-3xl text-blue-600 md:text-6xl font-extrabold tracking-tight mb-1 capitalize">{{sport}}</h2>
            <div class="font-base tracking-tight text-gray-600">{{resultats.length}} clubs à moins de 1500 mètres de chez vous.</div>
          </div>
        </div>

        <div class="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-2">

          <div class="flex flex-col" v-for="(club, i) in resultats" :key="`club-${i}`">
            <div class="bg-white rounded-3xl p-4">
              <div class="flex-none lg:flex">
                <div class=" h-full w-full lg:h-48 lg:w-48 lg:mb-0 mb-3">

                  <img v-if="club.photos === undefined" src="https://images.unsplash.com/photo-1622180203374-9524a54b734d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
                  alt="Just a flower" class=" w-full  object-scale-down lg:object-cover  lg:h-48 rounded-2xl">

                  <img v-else :src="`/googleApiMap/maps/api/place/photo?maxwidth=400&photoreference=${club.photos[0].photo_reference}&key=MYKEY`"
                  alt="Just a flower" class=" w-full  object-scale-down lg:object-cover  lg:h-48 rounded-2xl">

                </div>
                <div class="flex-auto ml-3 justify-evenly py-2">
                  <div class="flex flex-wrap ">
                    <!-- <div class="w-full flex-none text-xs text-blue-700 font-medium ">
                    Club
                  </div> -->
                    <h2 class="flex-auto text-lg font-medium">{{club.name}}</h2>
                  </div>
                  <p class="mt-3"></p>
                  <div class="py-4  text-sm text-gray-600">
                    <div class="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none"
                          viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                        </path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <p class="">{{club.formatted_address}}</p>
                    </div>
                    <div class="flex items-center mt-2" v-if="club.formatted_phone_number">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <line class="a" x1="18.5" y1="19.5" x2="5.5" y2="19.5"></line>
                        <path class="a" d="M12,21.25h0a.25.25,0,0,1,.25.25h0a.25.25,0,0,1-.25.25h0a.25.25,0,0,1-.25-.25h0a.25.25,0,0,1,.25-.25"></path>
                        <rect class="a" x="5.5" y="0.5" width="13" height="23" rx="2" ry="2"></rect>
                        <line class="a" x1="8" y1="10" x2="8" y2="11"></line>
                        <line class="a" x1="10" y1="9" x2="10" y2="12"></line>
                        <line class="a" x1="16" y1="10" x2="16" y2="11"></line>
                        <line class="a" x1="14" y1="9" x2="14" y2="12"></line>
                        <line class="a" x1="12" y1="7.5" x2="12" y2="13.5"></line>
                      </svg>
                      <p class="">{{club.formatted_phone_number}}</p>
                    </div>
                  </div>
                  <div class="flex p-4 pb-2 border-t border-gray-200 "></div>
                  <div class="flex space-x-3 text-sm font-bold">
                    <a v-if="club.website" :href="club.website" target="_blank" class="text-blue-600 underline" aria-label="like">Site internet</a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </Container>
    </div>


  </div>
</template>

<script>
import _ from 'lodash'

export default {
  data() {
    return {
      resultats: [],
      sport: null,
      loaded: false
    }
  },
  methods: {
  },
  async mounted() {
    this.$nuxt.$emit('stopLoopPlease')
    await this.getResultats().then(() => {
      this.loaded = true
    })
  },
  methods: {
    async getResultats() {
      // console.log(this.$store.state.sports);
      let resultats = this.$store.state.sports.resultats
      let sport = this.$route.params.sport
      if(resultats.length == 0 ) {
        return false
      }

      this.sport = sport

      let results = _.find(resultats, {sportslug: sport})

      for (let club of results.resultats) {
        // get club from google place
        let data
        try {
          data = await this.$axios.$get(`/googleApiMap/maps/api/place/details/json?place_id=${club.place_id}&key=MYKEY`);
        } catch (e) {

        } finally {
          console.log(data);
          if(data.status == 'OK') this.resultats.push(data.result)
        }
      }
      return true
    }
  }
}
</script>

<style lang="css" scoped>
</style>
