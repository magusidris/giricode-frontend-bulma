<template>
  <div>
    <navbar />
    <Nuxt id="web" />
    <footerbar />
  </div>
</template>

<script>
import Hero from '@/components/web/Hero'
import Navbar from '@/components/web/Navbar'
import Footerbar from '@/components/web/Footer'
export default {
  name: 'default',
  components: {
    Hero,
    Navbar,
    Footerbar
  },
  data () {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: { name: 'inspire' }
        }
      ]
    }
  },
  mounted() {
    document.documentElement.classList.remove('has-aside-left')
    document.documentElement.classList.remove('has-aside-mobile-transition')
    document.documentElement.classList.remove('has-navbar-fixed-top')
    document.documentElement.classList.remove('has-aside-expanded')
  }
}
</script>
