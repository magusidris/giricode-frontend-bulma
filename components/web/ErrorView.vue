<template>
  <div>
    <div class="container is-max-widescreen">
      <section class="section pt-0">
        <nuxt-link :to="navigateToPage" class="button is-primary">{{navigateToText}}</nuxt-link>
      </section>
    </div>
    <!-- <h2 class="subtitle">{{status}}<span> :(</span></h2> -->
    <section class="section pt-0">
      <div class="container">
        <div class="columns is-centered is-vcentered">
          <nuxt-img :src="image" width="700px" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      required: true,
      type: String
    },
    status: {
      required: true,
      type: String
    },
    navigateToPage: {
      required: true,
      type: String
    },
    navigateToText: {
      required: true,
      type: String
    },
    image: {
      required: true,
      type: String
    }
  }
}
</script>

<style scoped>
  .title {
    font-size: 40px;
  }
  .subtitle {
    font-size: 140px;
    text-align: center;
  }
</style>
