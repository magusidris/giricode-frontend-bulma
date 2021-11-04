<template>
  <div>
    <titlebar :title-stack="titleStack" />
    <section class="section is-main-section">
      <card-component title="Data Kategori" class="has-table has-mobile-sort-spaced">
        <b-field class="mt-3 mx-3">
            <p class="control">
                <b-button :to="{name: 'admin-categories-create'}" tag="nuxt-link" type="is-danger" label="Tambah" icon-pack="fas" icon-left="plus-circle" />
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
            :per-page="categories.per_page"
            :striped="true"
            :hoverable="true"
            default-sort="name"
            :data="categories.data">
              <b-table-column label="Image" centered field="image" sortable v-slot="props">
                <nuxt-img
                  :src="`/storage/categories/`+props.row.image"
                  :alt="props.row.name"
                  preset="web"
                  width="50px"
                  sizes="sm:355px md:320px lg:480px" />
              </b-table-column>
              <b-table-column label="Name" centered field="name" sortable v-slot="props">
                {{ props.row.name }}
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
                    :to="{ name: 'admin-categories-edit-id', params: { id: props.row.id } }"
                    class="button is-small is-primary"
                  >
                    <b-icon icon="account-edit" size="is-small" />
                  </nuxt-link>
                  <button
                    class="button is-small is-danger"
                    type="button"
                    @click.prevent="destroyCategory(props.row.id)"
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
          :total="categories.total"
          :perPage="categories.per_page">
        </b-pagination>
      </card-component>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Titlebar from '@/components/admin/TitleBar'
import CardComponent from '@/components/admin/CardComponent'
export default {
  layout: 'admin',
  components: {
    Titlebar,
    CardComponent
  },
  data() {
    return {

      isLoading: false,
      // state search
      search: ''
    }
  },
  computed: {
    titleStack() {
      return ['Admin', 'Kategori']
    },
    ...mapState({
      categories: state => state.admin.category.categories,
      currentPage: state => state.admin.category.categories.current_page,
      qParams: state => state.admin.category.page
    })
  },
  head() {
    return {
      title: 'Kategori — Admin Giricode',
    }
  },

  // hook "asyncData"
  async asyncData({ store, query }) {

    // this.$store.commit('admin/category/setPage', page)
    await store.commit('admin/category/setPage', query.page)
    await store.dispatch('admin/category/getCategoriesData')
  },

  methods: {
    //method "searchData"
    searchData() {

        //commit to mutation "SET_PAGE"
        this.$store.commit('admin/category/setPage', 1)

        //dispatch on action "getProductsData"
        this.$store.dispatch('admin/category/getCategoriesData', this.search)
    },

    //method "changePage"
    changePage(page) {

        //commit to mutation "SET_PAGE"
        this.$store.commit('admin/category/setPage', page)
        this.$router.push({
          name: 'admin-categories',
          query: {
            page: this.qParams
          }
        })

        //dispatch on action "getProductsData"
        this.$store.dispatch('admin/category/getCategoriesData', this.search)
    },
    destroyCategory(id) {
      this.$buefy.dialog.confirm({
          title: 'Apakah Anda Yakin ?',
          message: 'Ingin <b>Menghapus</b> Data ini ?',
          confirmText: 'Ya, Hapus!',
          cancelText: 'Tidak',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => {

            // dispatch to action "deleteCategory" vuex
            this.$store.dispatch('admin/category/destroyCategory', id)
              .then(() => {

                // refresh data
                this.$nuxt.refresh()

                this.$buefy.toast.open('Data Berhasil Dihapus!')
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
