<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Tags
      </p>
    </header>
    <div class="card-content">
      <div class="tags are-small">
        <div v-for="tag in tags" :key="tag.id">
          <nuxt-link class="tag mr-2" :class="tag.color.value" :to="{ name: 'tag-slug', params: { slug: tag.slug } }">
            {{ tag.name }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      tags: state => state.web.tag.tags
    })
  },
  // hook "fetch"
  async fetch() {

    // fetching categories on Rest API
    await this.$store.dispatch('web/tag/getTagsData')
  },
}
</script>
