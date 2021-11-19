<template>
  <section class="section">
    <div class="container is-max-widescreen">
      <h1 class="title">
        Tag : {{ tag.name }}
      </h1>
      <div class="columns is-multiline is-variable is-1-mobile is-8-tablet is-4-desktop is-6-widescreen is-8-fullhd">
        <div class="column is-4-desktop is-6-tablet is-12-mobile py-7" v-for="post in tag.posts" :key="post.id">
          <nuxt-link :to="{ name: 'slug', params: {slug: post.slug} }">
            <post-card :post="post" />
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import PostCard from '@/components/web/PostCardCategory'
export default {
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'og:url',
          name: 'og:url',
          content: this.url
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: this.title
        },
        {
          hid: 'description',
          name: 'description',
          content: this.description
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.description
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: this.image
        }
      ]
    }
  },
  data() {
    return {
      title: `Tutorial by Tag ${this.tagName} - Giricode`,
      description: `Cari Tutorial berdasarkan Tags: ${this.tagName}`,
      image: 'https://giricode.com/_ipx/f_webp,fit_fill,q_80,w_1000/storage/sliders/fSdgTkdPjKwyHJW7Ga9wro3p3HZ4Vt9RmDxIM10l.svg',
      url: `${process.env.baseUrl}/tag/${this.tagName}`
    }
  },
  components: {
    PostCard
  },

  // computed
  computed: {

    ...mapState({
      // category
      tag: state => state.web.tag.tag,
      tagName: state => state.web.tag.tag.name
    })
  },

  // hook "asyncData"
  async asyncData({ store, route }) {
    await store.dispatch('web/tag/getDetailTag', route.params.slug)
  }
}
</script>
