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
import PostCard from '@/components/web/PostCard'
export default {
  components: {
    PostCard
  },

  // computed
  computed: {

    ...mapState({
      // category
      tag: state => state.web.tag.tag
    })
  },

  // hook "asyncData"
  async asyncData({ store, route }) {
    await store.dispatch('web/tag/getDetailTag', route.params.slug)
  }
}
</script>
