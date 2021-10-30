<template>
  <div>
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
            <p class="title is-size-5">{{ post.title }}</p>
          </div>
        </div>
        <div class="content">

          <p class="is-size-7">
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
            {{ viewCount }}

          </p>
        </div>
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
  computed: {
    viewCount() {
      return this.post.views.length
    }
  }
}
</script>

<style lang="scss" scoped>
  .title {
    height: 4rem
  }
</style>
