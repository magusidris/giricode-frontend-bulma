export default {

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
    title: 'giricode-frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/main.scss',
    '@/assets/css/icons.css'
  ],

  styleResources: {
    scss: [
      '@/assets/scss/variables.scss'
    ]
   },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/axios' },
    { src: '~/plugins/components'},
    { src: '~/plugins/integrations'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    //https://dev.auth.nuxtjs.org/
    '@nuxtjs/auth-next',
    '@nuxtjs/style-resources',
    // https://image.nuxtjs.org/
    '@nuxt/image',
  ],

  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/giricode/image/upload/'
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true
  },

  proxy: {
    '/api': {
      target: 'https://backend.giricode.com/',
      pathRewrite: { '^/api': '/' }
    }
  },

  auth: {
    strategies: {
      'jwt': {
        provider: 'laravel/jwt',
        url: process.env.BASE_URL || 'http://localhost:2021',
        endpoints: {
          login: {
            url: '/api/v1/auth/login',
            method: 'post',
            propertyName: 'token'
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
          maxAge: 20160 * 60
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
