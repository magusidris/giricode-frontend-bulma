<template>
  <nuxt-link :to="to" class="is-dark-green" :class="{'is-active': isActive}">
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: String,
    required: false
  },
  computed: {
    isActive() {
      return this.to === this.$route.path
    }
  }
}
</script>
