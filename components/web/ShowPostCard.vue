<template>
  <div class="card">
    <div class="card-content">
      <figure class="image is-4by2">
        <!-- <nuxt-img :src="image" alt="post.title" height="200" /> -->
        <nuxt-img
          :src="`/storage/posts/`+post.image"
          alt="post.title"
          preset="web"
          height="300px"
          sizes="sm:355px md:320px lg:480px" />
      </figure>
      <hr>
      <div class="media">
        <div class="media-content">
          <p class="title is-5">{{ post.title }}</p>
          <p>
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
              icon="user"
              size="is-small">
            </b-icon>
            {{ post.user.name }}

            <b-icon
              class="ml-4"
              pack="fas"
              icon="folder"
              size="is-small">
            </b-icon>
            {{ post.category.name }}

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
      <!-- <div class="content mt-5 is-normal ck-content" v-html="proccessedMarkdown">
      </div> -->
      <markdown-display :markdown="post.content" />
      <hr>
      <div>
        <div class="tags are-normal">
          <nuxt-link v-for="tag in post.tags" :key="tag.id" class="tag" :class="tag.color.value" :to="{ name: 'tag-slug', params: { slug: tag.slug } }">
            {{ tag.name }}
          </nuxt-link>
        </div>
      </div>
      </div>
  </div>
</template>

<script>
import MarkdownDisplay from '~/components/admin/MarkdownDisplay'
export default {
  components: {
    MarkdownDisplay
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>
