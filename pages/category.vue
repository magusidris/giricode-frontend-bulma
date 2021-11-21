<template>
  <div>
    <section class="hero hero-large bg-primary300">
      <div class="hero-body">
        <div class="container is-max-widescreen h-100">
          <div class="columns h-100 is-vcentered">
            <div class="column">
              <p class="title is-size-2">
                Artikel by Kategori: <span class="color-primary50">{{ category.name }}</span>
              </p>
              <p class="subtitle">
                Sesuaikan artikel pembelajaran berdasarkan kategori, kami telah menyiapkan banyak materi pada setiap bagian kategori berdasarkan kasus masalah yang sering ditemukan.
              </p>
              <p>
                <nuxt-link :to="{name: 'category-slug', params: {slug: category.slug}}" v-for="(category, i) in categories" :key="i">
                  <button class="button is-large is-success is-inverted mr-2 mb-2">
                    <nuxt-img
                      :src="`/storage/categories/`+category.image"
                      alt="post.title"
                      preset="web"
                      sizes="sm:32px md:32px lg:32px" />
                  </button>
                </nuxt-link>
              </p>
            </div>
            <div class="column is-5 is-hidden-mobile">
              <nuxt-img
                src="/img/codetyping.svg"
                :alt="category.name"
                preset="web"
                sizes="sm:355px md:320px lg:400px" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <nuxt-child />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      categories: state => state.web.category.categories,
      category: state => state.web.category.category
    })
  },
  async fetch() {
    await this.$store.dispatch('web/category/getCategoriesData')
  }
}
</script>

<style lang="scss" scoped>
  p.title {
    color: #fff!important;
  }
  p.subtitle {
    color: #fff!important;
  }
</style>
