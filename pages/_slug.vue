<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-three-quarters">
            <web-show-post-card />
          </div>
          <div class="column">
            <div class="columns is-multiline">
              <div class="column is-12">
                <web-category-card />
              </div>
              <div class="column is-12">
                <web-tag-card />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
    async fetch({store, params}) {
      await store.dispatch('web/post/getDetailPost', params.slug)
    }
}
</script>
