<template>
  <section class="section">
    <div class="container is-max-widescreen">
      <div class="columns is-multiline is-variable is-1-mobile is-8-tablet is-4-desktop is-6-widescreen is-8-fullhd">
        <div class="column is-4-desktop is-6-tablet is-12-mobile py-7" v-for="post in category.posts" :key="post.id">
          <nuxt-link :to="{ name: 'slug', params: {slug: post.slug} }">
            <category-card :post="post" />
            <!-- {{ viewCount }} -->
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import CategoryCard from '@/components/web/PostCardCategory'
export default {
  head() {
    return {
      title: `Tutorial by Kategori ${this.categoryName} - Giricode`,
      meta: [
        {
          hid: 'og:url',
          name: 'og:url',
          content: `${process.env.baseUrl}/category/${this.categoryName}`
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
          content: `Tutorial by Kategori ${this.categoryName} - Giricode`
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: 'Giricode'
        },
        {
          hid: 'description',
          name: 'description',
          content: `Cari Tutorial berdasarkan Kategori: ${this.categoryName}`
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: `Cari Tutorial berdasarkan Kategori: ${this.categoryName}`
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
          content: `Tutorial by Kategori ${this.categoryName} - Giricode`
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: `Cari Tutorial berdasarkan Kategori: ${this.categoryName}`
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
    CategoryCard
  },
  // computed
  computed: {
    ...mapState({
      // category
      category: state => state.web.category.category,
      categoryName: state => state.web.category.category.name
    })
  },

  // hook "asyncData"
  async asyncData({ store, route }) {
    await store.dispatch('web/category/getDetailCategory', route.params.slug)
  }
}
</script>

<style lang="scss" scoped>
.section {
  min-height: 56vh;
}
</style>
