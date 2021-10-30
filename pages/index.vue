<template>
  <div>
    <section class="section">
      <div class="container is-max-widescreen">
        <web-carousel />
      </div>
    </section>
    <section class="section pt-0">
      <div class="container is-max-widescreen">
        <div class="columns is-multiline is-mobile">
          <div class="column is-full-mobile is-full-tablet is-8-desktop">
            <div class="columns is-multiline is-mobile">
              <div class="column is-half-mobile is-full-desktop is-half-tablet" v-for="post in posts.data" :key="post.id">
                <nuxt-link :to="{name: 'slug', params: {slug: post.slug}}">
                  <web-post-card :post="post" />
                </nuxt-link>
              </div>
            </div>
            <div class="columns mt-4">
              <div class="column has-text-centered">
                <nuxt-link :to="{name: 'post', query: {page: 1}}" class="button is-dark-green">LIHAT LEBIH BANYAK</nuxt-link>
              </div>
            </div>
          </div>
          <div class="column is-4-desktop is-full-tablet">
            <div class="columns is-multiline is-mobile">
              <div class="column is-full">
                <web-category-card />
              </div>
              <div class="column is-12">
                <web-tag-card />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { bootstrap } from 'vue-gtag'
import { SnackbarProgrammatic as Snackbar } from 'buefy'
export default {
  data() {
    return {
      isOpen: false
    }
  },
  computed: {
    ...mapState({
      posts: state => state.web.post.posts,
      currentPage: state => state.web.post.posts.current_page,
      statePage: state => state.web.post.page
    })
  },
  mounted() {
    if (!this.getGDPR() === true) {
        this.isOpen = true;
    }
    if (this.isOpen === true) {
      Snackbar.open({
            indefinite: true,
            message: 'Dapatkah menggunakan cookie untuk Analytics?',
            position: 'is-bottom',
            actionText: 'Ya, tentu',
            cancelText: 'Tidak',
            onCancel: () => {
              this.deny()
            },
            onAction: () => {
              this.accept()
            }
        })
    }
  },
  async fetch({ store, query }) {
    // fetching slider on Rest API
    await store.commit('web/post/setPage', query.page)
    await store.dispatch('web/post/getPostsData')
  },
  methods: {
    getGDPR() {
        if (process.browser) {
            return localStorage.getItem('GDPR:accepted', true);
        }
    },
    accept() {
      if (process.browser) {
        bootstrap().then(gtag => {
          this.isOpen = false;
          localStorage.setItem('GDPR:accepted', true)
          location.reload();
        })
      }
    },
    deny() {
      if (process.browser) {
        this.isOpen = false;
        localStorage.setItem('GDPR:accepted', false);
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  .border-column {
    border: 2px solid black;
  }
</style>

