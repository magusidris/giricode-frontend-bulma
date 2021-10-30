<template>
  <div>
    <section>
      <b-carousel
            :indicator="indicator"
            :indicator-background="indicatorBackground"
            :indicator-inside="indicatorInside"
            :indicator-mode="indicatorMode"
            :indicator-position="indicatorPosition"
            :indicator-style="indicatorStyle">
            <b-carousel-item v-for="slider in sliders" :key="slider.id">
                <section :class="`hero is-medium`">
                    <nuxt-img
                          :src="`/storage/sliders/`+slider.image"
                          alt="post.title"
                          preset="web"
                          width="1500"
                          sizes="sm:355px md:320px lg:1000px" />
                </section>
            </b-carousel-item>
        </b-carousel>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
      return {
        indicator: true,
        indicatorBackground: false,
        indicatorInside: true,
        indicatorMode: 'hover',
        indicatorPosition: 'is-bottom',
        indicatorStyle: 'is-dots'
      }
  },
  computed: {
    ...mapState({
      sliders: state => state.web.slider.sliders
    })
  },
  async fetch() {
    // fetching slider on Rest API
    await this.$store.dispatch('web/slider/getSlidersData')
  }
}
</script>

