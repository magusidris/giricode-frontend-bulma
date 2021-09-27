<template>
  <section class="section">
    <div class="container">
      <h1 class="title mx-6">
        Tag : {{ tag.name }}
      </h1>
      <div class="columns is-multiline">
        <div class="column is-4" v-for="post in tag.posts" :key="post.id">
          <web-post-card :post="post" />
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
