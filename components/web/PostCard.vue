<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by2">
        <nuxt-img
          :src="`/storage/posts/`+post.image"
          alt="post.title"
          preset="web"
          sizes="sm:355px md:320px lg:480px" />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-5">{{ post.title }}</p>
        </div>
      </div>
      <div class="content">

        <time :datetime="post.created_at">
          <b-icon
            pack="fas"
            icon="calendar"
            size="is-small">
          </b-icon>
          {{ post.created_at }}
          </time>
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
  }
}
</script>

<style lang="scss" scoped>
  .title {
    height: 4rem
  }
</style>
