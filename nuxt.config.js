export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s | Rese',
    title: '飲食店予約アプリ',
    htmlAttrs: {
      lang: 'ja',
      prefix: 'og: http://ogp.me/ns#'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '架空の店舗です。' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'og:description', property: 'og:description', content: '架空の店舗です。' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Rese' },
      { hid: 'og:image', property: 'og:image', content: '/icon.png' },
      { hid: 'og:url', property: 'og:url', content: '' },
      { hid: 'og:type', property: 'og:type', content: 'website' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'shortcut icon', href: '/favicon.ico' }
    ]
  },

  router: {
    middleware: [
      'auth'
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: '~/assets/sass/common.scss' }
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/vee-validate.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',

    '@nuxtjs/style-resources',

    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_URL,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'ja'
    }
  },

  // StyleResources module
  styleResources: {
    scss: [
      '~/assets/sass/_variables.scss'
    ]
  },

  // auth-next module
  auth: {
    localStorage: false,
    redirect: {
      login: '/login',
      logout: '/login',
      callback: false,
      home: '/'
    },
    strategies: {
      'laravelJWT': {
        provider: 'laravel/jwt',
        tokenType: 'bearer',
        url: process.env.API_URL,
        token: {
          maxAge: 60 * 60
        },
        refreshToken: {
          maxAge: 20160 * 60
        },
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'access_token' },
          logout: { url: '/logout', method: 'post' },
          refresh: { url: '/refresh', method: 'post' , propertyName: 'access_token' },
          user: { url: '/user', method: 'get', propertyName: 'user' },
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      "vee-validate/dist/rules"
    ]
  }
}
