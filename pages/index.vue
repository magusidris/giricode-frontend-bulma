<template>
  <div>
    <section class="hero hero-large bg-primary300">
      <div class="hero-body">
        <div class="container is-max-widescreen h-100">
          <div class="columns h-100 is-vcentered">
            <div class="column">
              <p class="title is-size-3 has-text-white pb-3">
                Belajar koding bahasa Indonesia mulai dasar hingga expert.
              </p>
              <p class="subtitle has-text-white">
                Sesuaikan artikel pembelajaran berdasarkan kategori, kami telah menyiapkan banyak materi pada setiap bagian kategori berdasarkan kasus masalah yang sering ditemukan.
              </p>
              <p>

              </p>
            </div>
            <div class="column is-5 is-hidden-mobile">
              <nuxt-img
                src="/img/opensource.svg"
                alt="post title"
                preset="web"
                sizes="sm:355px md:320px lg:400px" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <nuxt-child />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Carousel from '@/components/web/Carousel'
import PostCard from '@/components/web/PostCard'
import CategoryCard from '@/components/web/CategoryCard'
import TagCard from '@/components/web/TagCard'
export default {
  head() {
    return {
      title: 'Giricode - Solusi Tutorial Pemrograman Lengkap',
      meta: [
        {
          hid: 'og:url',
          name: 'og:url',
          content: process.env.baseUrl
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
          content: 'Giricode - Solusi Tutorial Pemrograman Lengkap'
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: 'Giricode'
        },
        {
          hid: 'description',
          name: 'description',
          content: 'Belajar koding bahasa Indonesia mulai dasar hingga expert.'
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: 'Belajar koding bahasa Indonesia mulai dasar hingga expert.'
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: 'https://giricode.com/_ipx/f_webp,fit_fill,q_80,w_1000/storage/sliders/fSdgTkdPjKwyHJW7Ga9wro3p3HZ4Vt9RmDxIM10l.svg'
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Giricode - Solusi Tutorial Pemrograman Lengkap'
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'Belajar koding bahasa Indonesia mulai dasar hingga expert.'
        },
        {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: '@Giricode'
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https://giricode.com/_ipx/f_webp,fit_fill,q_80,w_1000/storage/sliders/fSdgTkdPjKwyHJW7Ga9wro3p3HZ4Vt9RmDxIM10l.svg'
        }
      ]
    }
  },
  components: {
    Carousel,
    PostCard,
    CategoryCard,
    TagCard
  },
  computed: {
    ...mapState({
      posts: state => state.web.post.posts
    })
  },
  async fetch({ store, query }) {
    // fetching slider on Rest API
    await store.commit('web/post/setPage', query.page)

    await store.dispatch('web/post/getPostsData')
  }
}
</script>
