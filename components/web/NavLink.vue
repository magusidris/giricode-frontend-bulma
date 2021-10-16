<template>
  <nuxt-link :to="to" class="has-background-info-dark" :class="{'is-active': isActive}">
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: String,
    required: true
  },
  computed: {
    isActive() {
      return this.to === this.$route.path
    }
  }
}
</script>
