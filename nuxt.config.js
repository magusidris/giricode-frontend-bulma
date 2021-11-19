const pkg = require('./package')

export default {
  mode: 'universal',
  server: {
    port: 2021
  },
  // Target Deployment
  target: 'server',

  //rendering mode SSR
  ssr: true,

  loading: {
    color: 'white',	// <-- color
    height: '5px'	// <-- height
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: pkg.name,
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#AECAB2' },
      { hid: 'description', name: 'description', content: pkg.description },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'og:title', name: 'og:title', content: 'Giricode' },
      { hid: 'og:locale', name: 'og:locale', content: 'en_ID' },
      { hid: 'og:url', name: 'og:url', content: process.env.BASE_URL || 'http://localhost:2021' },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      { hid: 'og:image', name: 'og:image', content: 'https://giricode.com/_ipx/f_webp,fit_fill,q_80,w_1000/storage/sliders/fSdgTkdPjKwyHJW7Ga9wro3p3HZ4Vt9RmDxIM10l.svg' },
      { hid: 'og:description', name: 'og:description', content: pkg.description }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/img/mobile-logo.svg'
      },
      { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&family=Source+Code+Pro:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,900&display=swap',
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/main.scss',
    '@/assets/css/icons.css',
    // '@/assets/vendor/hljs/styles/atom-one-dark.min.css'
    // '@/assets/css/vue-md.css',
    // '@/assets/css/vue-md.css'
  ],

  script: [
    // '@/assets/vendor/hljs/highlight.min.js',
    // '@/assets/vendor/hljs/vue-plugin/dist/highlightjs-vue.min.js'
  ],

  styleResources: {
    scss: [
      './assets/scss/variables.scss'
    ]
   },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/axios' },
    { src: '~/plugins/components'},
    { src: '~/plugins/integrations'},
    { src: '~/plugins/after-each', mode: 'client' },
    { src: '~/plugins/google-analytics', mode: 'client' },
    { src: '~/plugins/multi-select' },
    { src: '~/plugins/advanced-crop' },
    // { src: '~/plugins/highlight.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    ['nuxt-buefy'],
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    //https://dev.auth.nuxtjs.org/
    '@nuxtjs/auth-next',
    '@nuxtjs/style-resources',
    // https://image.nuxtjs.org/
    '@nuxt/image',
    //https://github.com/avil13/vue-sweetalert2
    'vue-sweetalert2/nuxt'
  ],

  image: {
    domains: [
      'backend.giricode.com'
      // 'http://giricode-backend.test'
    ],
    alias: {
      storage: 'https://backend.giricode.com/storage'
      // storage: 'http://giricode-backend.test/storage'
    },
    presets: {
      web: {
        modifiers: {
          format: 'webp',
          fit: 'fill',
          quality: '80'
        }
      }
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true
  },

  proxy: {
    '/api': {
      target: 'https://backend.giricode.com/',
      // target: 'http://giricode-backend.test/',
      pathRewrite: { '^/api': '/' },
      changeOrigin: true
    }
  },

  auth: {
    strategies: {
      'jwt': {
        provider: 'laravel/jwt',
        scheme: 'refresh',
        url: process.env.BASE_URL || 'http://localhost:2021',
        endpoints: {
          login: {
            url: '/api/v1/auth/login',
            method: 'post'
          },
          refresh: {
            url: '/api/v1/auth/refresh',
            method: 'get'
          },
          logout: {
            url: '/api/v1/auth/logout',
            method: 'post'
          },
          user: {
            url: '/api/v1/auth/me',
            method: 'get',
            propertyName: 'user'
          }
        },
        token: {
          property: 'token',
          maxAge: 60 * 60
        },
        refreshToken: {
          property: 'token',
          maxAge: 20160 * 60
        },
      },
    },
  },

  env: {
    baseUrl: 'https://giricode.com' || 'http://localhost:2021'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    /*
     ** You can extend webpack config here
     */

     extend(config, ctx) {
      if (!config.externals) {
        config.externals = {}
      }

      // Remove moment.js from chart.js
      // https://www.chartjs.org/docs/latest/getting-started/integration.html#bundlers-webpack-rollup-etc
      config.externals.moment = 'moment'
    }
  }
}
