<template>
  <div class="card blog"
    @mouseover="hover = true"
    @mouseleave="hover = false">
    <div class="card-image">
      <figure class="image is-4by2">
        <nuxt-img
          :src="`/storage/posts/`+post.image"
          alt="post.title"
          preset="web"
          sizes="sm:355px md:320px lg:480px" />
      </figure>
    </div>
    <div class="card-content px-4">
      <div class="media">
        <div class="media-content">
          <span class="tag mr-2 mb-2" :class="`${tag.color.value} ${hover ? '' : 'is-light'}`" v-for="tag in post.tags" :key="tag.id" v-html="tag.name" />
          <p class="blog-title title is-5" v-html="post.title" />
        </div>
      </div>
      <div class="content pr-5">
        <p class="is-size-7" :class="`${hover ? '' : 'has-text-grey'}`">
          <time :datetime="post.created_at">
            <b-icon
              pack="fas"
              icon="calendar"
              size="is-small">
            </b-icon>
            {{ post.created_at }}
          </time>

          <b-icon
            class="ml-4"
            pack="fas"
            icon="eye"
            size="is-small">
          </b-icon>
          {{ post.views_count }}

        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      hover: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .title {
    min-height: 3rem
  }
</style>
