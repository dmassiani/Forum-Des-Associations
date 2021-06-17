export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Forum des associations en ligne',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // './assets/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/google-maps',
    '~plugins/filters',
  ],

  googleFonts: {
    families: {
      'DM+Sans': [400, 700],
    }
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
  ],

  proxy: {
    '/googleApiMap/': {
      target: 'https://maps.googleapis.com/',
      pathRewrite: {'^/googleApiMap/': '/'}
    },
    '/photo/': {
      target: 'https://lh3.googleusercontent.com/',
      pathRewrite: {'^/photo/': '/'}
    },
    // '/strapi/': {
    //   target: process.env.BASE_URL,
    //   pathRewrite: { "^/strapi/": "" }
    // },
  },
  maps: {
    // key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      transpile: [/^gmap-vue($|\/)/]
    }
  }
}
