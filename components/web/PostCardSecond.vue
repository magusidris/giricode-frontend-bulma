<template>
  <div class="card">
    <div class="columns is-multiline is-gapless">
      <div class="column card-image is-full">
        <figure class="image is-4by2">
          <nuxt-img
            :src="`/storage/posts/`+post.image"
            alt="post.title"
            preset="web"
            sizes="sm:355px md:320px lg:480px" />
        </figure>
      </div>
      <div class="mx-3 my-3 column status card-content is-full">
        <div class="media">
          <div class="media-content">
            <p class="title is-size-4">{{ post.title }}</p>
          </div>
        </div>
        <div class="content">
          <p class="is-size-6">
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

            <b-icon
              class="ml-4"
              pack="fas"
              icon="comments"
              size="is-small">
            </b-icon>
            {{ post.comments_count }}
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
  }
}
</script>

<style lang="scss" scoped>
  .title {
    min-height: 3rem
  }
</style>
