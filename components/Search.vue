<template>
  <div class="flex-1 mt-4 relative">
    <div class="mt-1 flex relative h-16">
      <div class="absolute w-full flex items-stretch flex-grow focus-within:z-10">
        <gmap-autocomplete
          :value="defaultSearch"
          ref="autocomplete"
          class="pl-4 h-16 text-blue-900 text-base bg-white block w-full leading-10 rounded-xl"
          @place_changed="search"
          placeholder="Votre adresse postale"
          type="text"
          :select-first-on-enter="true">
        </gmap-autocomplete>
      </div>
      <button @click="focusAutocomplete" class="hidden md:block z-20 absolute h-12 right-2 top-2 inline-flex items-center space-x-2 px-8 py-2 text-sm font-bold rounded-lg text-white bg-blue-600 focus:outline-none">
        Rechercher
      </button>
    </div>
    <div class="">
      <div>
        <select @change="changeDistance" v-model="distance" name="distance" class="bg-transparent text-blue-900 mt-1 inline-block w-44 pl-0 pr-10 py-2 text-base border-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
          <option value="1500">1500 mètres</option>
          <option value="2500">2500 mètres</option>
          <option value="5000">5000 mètres</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data() {
    return {
      defaultSearch: null,
      distance: 1500,
    }
  },
  mounted() {
    this.distance = this.$store.state.app.distance
    let location = this.$store.state.location.coordinate
    if(location.formatted_address != undefined) this.defaultSearch = location.formatted_address
  },
  methods: {
    changeDistance(e) {
      this.$store.commit('app/set', e.target.value)
      this.$nuxt.$emit('changeDistance')
      let location = this.$store.state.location.coordinate
      if(location.formatted_address != undefined) this.defaultSearch = location.formatted_address
    },
    async search(e) {
      this.$store.commit('location/add', e)
      this.$nuxt.$emit('changeLocation')
      this.$router.push('/associations-sportives')
    },
    focusAutocomplete() {
      this.$refs.autocomplete.$el.focus()
    }
  }
}

</script>

<style lang="scss" scoped>
</style>
