<template>
  <div class="card">
    <div class="columns is-multiline is-gapless">
      <div class="column card-image is-4-desktop is-full-tablet is-full-mobile">
        <figure class="image is-4by2">
          <nuxt-img
            :src="`/storage/posts/`+post.image"
            alt="post.title"
            preset="web"
            sizes="sm:355px md:320px lg:480px" />
        </figure>
      </div>
      <div class="mx-3 my-3 column status card-content is-7-desktop is-full-tablet is-full-mobile">
        <div class="media">
          <div class="media-content">
            <p class="title is-size-4-desktop is-size-5-tablet is-size-6-mobile">{{ post.title }}</p>
          </div>
        </div>
        <div class="content">
          <p class="is-size-7 has-text-grey">
            <time :datetime="post.created_at">
              <b-icon
                pack="fas"
                icon="calendar"
                size="is-small">
              </b-icon>
              <span>{{ post.created_at }}</span>
            </time>

            <b-icon
              class="ml-4 is-hidden-mobile"
              pack="fas"
              icon="eye"
              size="is-small">
            </b-icon>
            <span class="is-hidden-mobile">{{ post.views_count }}</span>

            <b-icon
              class="ml-4 is-hidden-mobile"
              pack="fas"
              icon="comments"
              size="is-small">
            </b-icon>
            <span class="is-hidden-mobile">{{ post.comments_count }}</span>
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
    min-height: 2rem
  }
  .status {
    display:flex;
    flex-direction:column;
    justify-content:space-between
  }
</style>
