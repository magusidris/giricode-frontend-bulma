<template>
  <div class="card">
    <div class="card-image">
      <figure class="image is-4by2">
        <img :src="post.image" alt="post.title">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-5">{{ post.title }}</p>
          <p class="subtitle is-6">@{{ post.user.username }}</p>
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
    async fetch({store, params}) {
      await store.dispatch('web/post/getDetailPost', params.slug)
    }
}
</script>
