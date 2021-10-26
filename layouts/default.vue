<template>
  <div>
    <web-hero />
    <web-navbar />
    <Nuxt id="web" />
    <web-footer />
  </div>
</template>

<script>
export default {
  name: 'default',
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

<style lang="scss" scoped>
// @import '~/assets/scss/web/main'
</style>
