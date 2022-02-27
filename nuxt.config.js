export default {
  router: {
    base: '/'
  },
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s | 東京都市大学デジタルコンテンツ研究会',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '東京都市大学デジタルコンテンツ研究会の公式ウェブサイトです。' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'og:type', property: 'og:type', content: 'article' },
      { hid: 'og:locale', property: 'og:locale', content: 'ja_JP' },
      { hid: 'og:site_name', property: 'og:site_name', content: '東京都市大学デジタルコンテンツ研究会' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'og:title', property: 'og:title', content: '東京都市大学デジタルコンテンツ研究会' },
      { hid: 'og:image', property: 'og:image', content: 'https://tcu-dc.net/ogp.png' },
      { hid: 'og:description', property: 'og:description', content: '東京都市大学デジタルコンテンツ研究会の公式ウェブサイトです。' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/destyle.min.css',
    '~/assets/css/style.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/google-gtag'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  'google-gtag': {
    id: process.env.GTAG_KEY,
    debug: false // Enable to track in dev mode.
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
