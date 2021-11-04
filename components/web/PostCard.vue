<template>
  <div class="card blog">
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
      <div class="mx-3 my-3 column status card-content is-full has-text-grey">
        <div class="content pr-5">
          <p class="is-size-7 has-text-weight-medium">
            <span class="mr-2" :class="'has-text-'+tag.color.value" v-for="tag in post.tags" :key="tag.id" v-html="tag.name" />
          </p>
          <p class="blog-title title is-size-6" v-html="post.title"></p>
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
            {{ post.views_count }}

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

  .status {
    display:flex;
    flex-direction:column;
    justify-content:space-between
  }
</style>
