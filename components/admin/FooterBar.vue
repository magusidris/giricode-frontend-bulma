<template>
  <footer v-show="isFooterBarVisible" class="footer h-100">
    <div class="container-fluid">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="footer-copyright">
              <b>&copy; 2021 by Idris</b> &mdash; Blog Giricode
            </div>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <div class="logo">
              <nuxt-link to="/">
                <img src="/img/mobile-logo.svg" alt="giricode.com" />
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import dayjs from 'dayjs'
import { mapState } from 'vuex'

export default {
  name: 'FooterBar',
  computed: {
    year() {
      return dayjs().year()
    },
    ...mapState(['isFooterBarVisible']),
  },
}
</script>

<style lang="scss" scoped>
</style>
