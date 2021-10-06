<template>
  <div class="card">
    <div class="card-content">
      <figure class="image is-4by2">
        <!-- <nuxt-img :src="image" alt="post.title" height="200" /> -->
        <nuxt-img
          :src="`/storage/posts/`+image"
          alt="post.title"
          preset="web"
          height="300px"
          sizes="sm:355px md:320px lg:480px" />
      </figure>
      <hr>
      <div class="media">
        <div class="media-content">
          <p class="title is-5">{{ title }}</p>
          <p>
            <time :datetime="created_at">
              <b-icon
                pack="fas"
                icon="calendar"
                size="is-small">
              </b-icon>
                {{ created_at }}
            </time>

            <b-icon
              class="ml-4"
              pack="fas"
              icon="user"
              size="is-small">
            </b-icon>
            {{ user }}

            <b-icon
              class="ml-4"
              pack="fas"
              icon="folder"
              size="is-small">
            </b-icon>
            {{ category }}
          </p>
          <div class="content mt-5" v-html="content" />
          <hr>
          <div>
            <div class="tags are-medium">
              <nuxt-link v-for="tag in tags" :key="tag.id" class="tag" :class="tag.color.value" :to="{ name: 'tag-slug', params: { slug: tag.slug } }">
                {{ tag.name }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
      image: {
        type: String,
        default: 'abcd'
      },
      title: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: ''
      },
      description: {
        type: String,
        default: ''
      },
      created_at: {
        type: String,
        default: ''
      },
      category: {
        type: String,
        default: ''
      },
      tags: {
        type: Array,
        required: true
      },
      user: {
        type: String,
        default: ''
      }
    }
}
</script>
