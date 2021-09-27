<template>
  <div>
    <section>
        <b-carousel
          :animated="animated"
          :pause-hover="pauseHover"
          :progress="progress"
          :progress-type="progressType">
          <b-carousel-item v-for="slider in sliders" :key="slider.id">
            <b-image class="image" :src="slider.image"></b-image>
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
          progress: true,
          progressType: 'is-primary',
          animated: 'fade',
          pauseHover: false,
          carousels: [
              { title: 'Slide 1', color: 'warning' },
              { title: 'Slide 2', color: 'dark' },
              { title: 'Slide 3', color: 'primary' },
              { title: 'Slide 4', color: 'info' }
          ]
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

