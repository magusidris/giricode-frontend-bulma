<template>
  <div>
    <section class="hero hero-large bg-primary300">
      <div class="hero-body">
        <div class="container is-max-widescreen h-100">
          <div class="columns h-100 is-vcentered">
            <div class="column">
              <p class="title is-size-3 is-size-4-mobile has-text-white pb-3">
                {{ postseri.title }}
              </p>
              <p class="subtitle is-size-5-mobile has-text-white">
                {{ postseri.description }}
              </p>
              <p>

              </p>
            </div>
            <div class="column is-5 has-text-centered">
              <nuxt-img
                :src="`/storage/postseries/${postseri.image}`"
                alt="post.title"
                preset="web"
                sizes="sm:200px md:280px lg:380px" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container is-max-widescreen">
        <div class="columns is-multiline is-variable is-1-mobile is-8-tablet is-4-desktop is-6-widescreen is-8-fullhd">
          <!-- <div class="column is-4-desktop is-6-tablet is-12-mobile py-7" v-for="post in posts" :key="post.id"> -->
          <div class="column is-half-desktop is-12-mobile py-7">
            <nav class="panel">
              <nuxt-link v-for="post in posts" :key="post.id" :to="{ name: 'slug', params: { slug: post.slug } }" class="panel-block px-4 py-4">
                <span class="panel-icon">
                  <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                {{ post.title }}
              </nuxt-link>
            </nav>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  head() {
    return {
      title: `${this.postseri.title} - Giricode`,
      meta: [
        {
          hid: 'og:url',
          name: 'og:url',
          content: `${process.env.baseUrl}/${this.postseri.slug}`
        },
        {
          hid: 'og:locale',
          name: 'og:locale',
          content: 'en_ID'
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: `${this.postseri.title} - Giricode`
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: 'Giricode'
        },
        {
          hid: 'description',
          name: 'description',
          content: this.postseri.description
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.postseri.description
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: `https://giricode.com/_ipx/f_webp,fit_fill,q_80,s_480x300/storage/postseries/${this.postseri.image}`
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `${this.postseri.title} - Giricode`
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.postseri.description
        },
        {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: '@Giricode'
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: `https://giricode.com/_ipx/f_webp,fit_fill,q_80,s_480x300/storage/postseries/${this.postseri.image}`
        }
      ]
    }
  },
  components: {
  },
  computed: {
    ...mapState({
      postseri: state => state.web.series.postseri.data,
      posts: state => state.web.series.postseri.data.posts
    }),
  },
  async fetch({ store, params }) {
    await store.dispatch('web/series/getDetailSeries', params.slug)
  }
}
</script>

<style lang="scss" scoped>
.section {
  min-height: 56vh;
}
</style>
