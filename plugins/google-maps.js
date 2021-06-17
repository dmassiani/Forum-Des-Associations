import Vue from "vue";

import * as GmapVue from '~/node_modules/gmap-vue'

Vue.use(GmapVue, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    libraries: 'places,drawing,visualization'
  },
  installComponents: true
});
