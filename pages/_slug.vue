<template>
  <div>
    <section class="section">
      <div class="container is-max-widescreen">
        <div class="columns">
          <div class="column is-three-quarters">
            <div class="columns is-multiline">
              <div class="column is-12">
                <show-post-card
                  :post="post" />
              </div>
              <div v-show="series.length > 0" class="column is-12" v-for="seri in series" :key="seri.id">
                <nav class="panel is-dark">
                  <p class="panel-heading">
                    Tutorial Dalam Tutorial Series Yang Sama
                  </p>
                  <nuxt-link v-for="panelPost in seri.posts" :key="panelPost.id" :to="{ name: 'slug', params: { slug: panelPost.slug } }" class="panel-block px-4 py-4">
                    <span class="panel-icon">
                      <i class="fas fa-book" aria-hidden="true"></i>
                    </span>
                    {{ panelPost.title }}
                  </nuxt-link>
                </nav>
              </div>
              <div class="column is-12">
                <comment-list
                  :comments="post.comments" />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="columns is-multiline">
              <div class="column is-12">
                <category-card />
              </div>
              <div class="column is-12">
                <tag-card />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ShowPostCard from '@/components/web/ShowPostCard'
import CommentList from '@/components/web/Comment/List'
import CategoryCard from '@/components/web/CategoryCard'
import TagCard from '@/components/web/TagCard'
export default {
  head() {
    return {
      title: `${this.post.title} - Giricode`,
      meta: [
        {
          hid: 'og:url',
          name: 'og:url',
          content: `${process.env.baseUrl}/${this.post.slug}`
        },
        {
          hid: 'og:locale',
          name: 'og:locale',
          content: 'en_ID'
        },
        {
          hid: 'og:type',
          name: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: `${this.post.title} - Giricode`
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: 'Giricode'
        },
        {
          hid: 'description',
          name: 'description',
          content: this.post.description
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: this.post.description
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: `https://giricode.com/_ipx/f_webp,fit_fill,q_80,s_480x300/storage/posts/${this.post.image}`
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `${this.post.title} - Giricode`
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.post.description
        },
        {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: '@Giricode'
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: `https://giricode.com/_ipx/f_webp,fit_fill,q_80,s_480x300/storage/posts/${this.post.image}`
        }
      ]
    }
  },
  components: {
    ShowPostCard,
    CommentList,
    CategoryCard,
    TagCard
  },
  computed: {
    ...mapState ({
      post: state => state.web.post.post,
      series: state => state.web.post.post.post_series
    })
  },
  async fetch({store, params}) {
    await store.dispatch('web/post/getDetailPost', params.slug)
    await store.dispatch('web/post/storeVisitor', params.slug)
  },
  async asyncData({store, params}) {
    await store.dispatch('web/post/updateSlug', {slug: params.slug})
  }
}
</script>

<style lang="scss" scoped>
.nuxt-link-active {
  background: $primary-300;
  color: #fff;
  > span {
    color: #fff;
  }
}
.nuxt-link-active:hover {
  background: $primary-300;
  color: #fff;
  > span {
    color: #fff;
  }
}
</style>
