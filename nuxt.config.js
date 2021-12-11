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
      { hid: 'theme-color', name: 'theme-color', content: '#699d7e' },
      { hid: 'description', name: 'description', content: pkg.description },
      { hid: 'apple-mobile-web-app-status-bar-style', name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'og:title', name: 'og:title', content: 'Giricode' },
      { hid: 'og:site_name', name: 'og:site_name', content: 'Giricode' },
      { hid: 'og:locale', name: 'og:locale', content: 'en_ID' },
      { hid: 'og:url', name: 'og:url', content: process.env.baseUrl },
      { hid: 'og:type', name: 'og:type', content: 'website' },
      { hid: 'og:image', name: 'og:image', content: 'https://giricode.com/_ipx/f_webp,fit_fill,q_80,w_1000/storage/sliders/fSdgTkdPjKwyHJW7Ga9wro3p3HZ4Vt9RmDxIM10l.svg' },
      { hid: 'og:description', name: 'og:description', content: pkg.description },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:title', name: 'twitter:title', content: 'Giricode' },
      { hid: 'twitter:description', name: 'twitter:description', content: pkg.description },
      { hid: 'twitter:site', name: 'twitter:site', content: '@Giricode' },
      { hid: 'twitter:image', name: 'twitter:image', content: 'https://giricode.com/_ipx/f_webp,fit_fill,q_80,w_1000/storage/sliders/fSdgTkdPjKwyHJW7Ga9wro3p3HZ4Vt9RmDxIM10l.svg' },
      { hid: 'og:image:width', name: 'og:image:width', content: '1200' },
      { hid: 'og:image:height', name: 'og:image:height', content: '630' }
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
    '@/assets/css/icons.css'
  ],

  script: [
  ],

  styleResources: {
    scss: [
      './assets/vars/*.scss'
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
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-buefy',
    '@nuxtjs/style-resources',
    //https://dev.auth.nuxtjs.org/
    '@nuxtjs/auth-next',
    // https://image.nuxtjs.org/
    '@nuxt/image',
    //https://github.com/avil13/vue-sweetalert2
    'vue-sweetalert2/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/pwa',
    '@nuxtjs/svg'
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

  pwa: {
    meta: {
      title: 'Giricode - Belajar koding bahasa Indonesia mulai dasar hingga expert.',
      author: 'Giricode',
      // 'theme-color': '#7BAE91',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent'
    },
    manifest: {
      name: 'Giricode',
      short_name: 'giricode',
      description: 'Belajar koding bahasa Indonesia mulai dasar hingga expert.',
      lang: 'en'
    },
    icon: {
      fileName: 'img/mobile-logo.png',
      sizes: [64, 120, 144, 152, 192, 384, 512]
    }
  },

  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storageKey: 'nuxt-color-mode'
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
        url: 'https://giricode.com' || 'http://localhost:2021',
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
    baseUrl: 'https://giricode.com' || 'http://localhost:2021',
    description: 'Belajar koding bahasa Indonesia mulai dasar hingga expert.',
    author: 'Mochammad Agus Idris',
    gid: 'G-DEX6KTZ8DS',
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
