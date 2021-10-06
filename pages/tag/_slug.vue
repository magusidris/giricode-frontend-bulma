<template>
  <section class="section">
    <div class="container is-max-widescreen">
      <h1 class="title">
        Tag : {{ tag.name }}
      </h1>
      <div class="columns is-multiline">
        <div class="column is-4" v-for="post in tag.posts" :key="post.id">
          <nuxt-link :to="{ name: 'slug', params: {slug: post.slug} }">
            <web-post-card :post="post" />
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {

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
