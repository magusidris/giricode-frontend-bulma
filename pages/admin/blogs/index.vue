<template>
  <div>
    <admin-title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <admin-card-component title="Data Kategori" class="has-table has-mobile-sort-spaced">
        <b-field class="mx-3">
            <p class="control">
                <b-button :to="{name: 'admin-blogs-create'}" tag="nuxt-link" type="is-danger" label="Tambah" icon-pack="fas" icon-left="plus-circle" />
            </p>
            <b-input type="text" v-model="search" @keyup.native.enter="searchData" expanded></b-input>
            <p class="control">
                <b-button type="is-success" @click="searchData" label="Cari" icon-pack="fas" icon-left="search" />
            </p>
        </b-field>
        <div class="tb-container">
          <b-table
            class="mx-3"
            :loading="isLoading"
            :per-page="posts.per_page"
            :striped="true"
            :hoverable="true"
            default-sort="name"
            :data="posts.data">
            <b-table-column label="Cover" centered field="image" sortable v-slot="props">
              <nuxt-img
                :src="`/storage/posts/`+props.row.image"
                :alt="props.row.name"
                preset="web"
                width="60px"
                sizes="sm:355px md:320px lg:480px" />
            </b-table-column>
            <b-table-column label="Judul" centered field="title" sortable v-slot="props">
              {{ props.row.title }}
            </b-table-column>
            <b-table-column label="Kategori" centered field="category" sortable v-slot="props">
              {{ props.row.category.name }}
            </b-table-column>
            <b-table-column label="Author" centered field="author" sortable v-slot="props">
              {{ props.row.user.username }}
            </b-table-column>
            <b-table-column label="Created" centered field="created_at" sortable v-slot="props">
              <small
                class="has-text-grey is-abbr-like"
                :title="props.row.created_at"
                >{{ props.row.created_at }}</small
              >
            </b-table-column>
            <b-table-column custom-key="actions" class="is-actions-cell" v-slot="props">
              <div class="buttons is-centered">
                <nuxt-link
                  :to="{ name: 'admin-blogs-edit-id', params: { id: props.row.id } }"
                  class="button is-small is-primary"
                >
                  <b-icon icon="account-edit" size="is-small" />
                </nuxt-link>
                <button
                  class="button is-small is-danger"
                  type="button"
                  @click.prevent="destroyPost(props.row.id)"
                >
                  <b-icon icon="trash-can" size="is-small" />
                </button>
              </div>
            </b-table-column>

            <section slot="empty" class="section">
              <div class="content has-text-grey has-text-centered">
                <template v-if="isLoading">
                  <p>
                    <b-icon icon="dots-horizontal" size="is-large" />
                  </p>
                  <p>Fetching data...</p>
                </template>
                <template v-else>
                  <p>
                    <b-icon icon="emoticon-sad" size="is-large" />
                  </p>
                  <p>Nothing's here&hellip;</p>
                </template>
              </div>
            </section>
          </b-table>
        </div>
        <b-pagination
          class="mx-3 my-3"
          :current="currentPage"
          @change="changePage"
          :total="posts.total"
          :perPage="posts.per_page">
        </b-pagination>
      </admin-card-component>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'admin',
  data() {
    return {

      isLoading: false,
      // state search
      search: ''
    }
  },
  computed: {
    titleStack() {
      return ['Admin', 'Blog']
    },
    ...mapState({
      posts: state => state.admin.post.posts,
      currentPage: state => state.admin.post.posts.current_page,
      qParams: state => state.admin.post.page
    })
  },
  head() {
    return {
      title: 'Kategori — Admin Giricode',
    }
  },

  // hook "asyncData"
  async asyncData({ store, query }) {

    // this.$store.commit('admin/post/setPage', page)
    await store.commit('admin/post/setPage', query.page)
    await store.dispatch('admin/post/getPostsData')
  },

  methods: {
    //method "searchData"
    searchData() {

        //commit to mutation "SET_PAGE"
        this.$store.commit('admin/post/setPage', 1)

        //dispatch on action "getProductsData"
        this.$store.dispatch('admin/post/getPostsData', this.search)
    },

    //method "changePage"
    changePage(page) {

        //commit to mutation "SET_PAGE"
        this.$store.commit('admin/post/setPage', page)
        this.$router.push({
          name: 'admin-blogs',
          query: {
            page: this.qParams
          }
        })

        //dispatch on action "getProductsData"
        this.$store.dispatch('admin/post/getPostsData', this.search)
    },
    destroyPost(id) {
      this.$buefy.dialog.confirm({
          title: 'Deleting account',
          message: 'Are you sure you want to <b>delete</b> your account? This action cannot be undone.',
          confirmText: 'Delete Account',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => {

            // dispatch to action "deletePost" vuex
            this.$store.dispatch('admin/post/destroyPost', id)
              .then(() => {

                // refresh data
                this.$nuxt.refresh()

                this.$buefy.toast.open('Account deleted!')
              })
          }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .tb-container {
    height: 25rem;
  }
</style>
