<template>
  <div>
    <admin-title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <admin-card-component title="Data Menu" class="has-table has-mobile-sort-spaced">
        <b-field class="mt-3 mx-3">
            <p class="control">
                <b-button :to="{name: 'admin-menus-create'}" tag="nuxt-link" type="is-danger" label="Tambah" icon-pack="fas" icon-left="plus-circle" />
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
            :per-page="menus.per_page"
            :striped="true"
            :hoverable="true"
            default-sort="name"
            :data="menus.data">
            <b-table-column label="Name" centered field="name" sortable v-slot="props">
              {{ props.row.name }}
            </b-table-column>
            <b-table-column label="URL" centered field="url" sortable v-slot="props">
              {{ props.row.url }}
            </b-table-column>
            <b-table-column label="Created at" centered field="created_at" sortable v-slot="props">
              <small
                class="has-text-grey is-abbr-like"
                :title="props.row.created_at"
                >{{ props.row.created_at }}</small
              >
            </b-table-column>
            <b-table-column custom-key="actions" class="is-actions-cell" v-slot="props">
              <div class="buttons is-centered">
                <nuxt-link
                  :to="{ name: 'admin-menus-edit-id', params: { id: props.row.id } }"
                  class="button is-small is-primary"
                >
                  <b-icon icon="account-edit" size="is-small" />
                </nuxt-link>
                <button
                  class="button is-small is-danger"
                  type="button"
                  @click.prevent="destroyMenu(props.row.id)"
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
          :total="menus.total"
          :perPage="menus.per_page">
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
      return ['Admin', 'Menu']
    },
    ...mapState({
      menus: state => state.admin.menu.menus,
      currentPage: state => state.admin.menu.menus.current_page,
      qParams: state => state.admin.menu.page
    })
  },
  head() {
    return {
      title: 'Menus — Admin Giricode',
    }
  },

  // hook "asyncData"
  async asyncData({ store, query }) {

    // this.$store.commit('admin/menu/setPage', page)
    await store.commit('admin/menu/setPage', query.page)
    await store.dispatch('admin/menu/getMenusData')
  },

  methods: {
    //method "searchData"
    searchData() {

        //commit to mutation "SET_PAGE"
        this.$store.commit('admin/menu/setPage', 1)

        //dispatch on action "getProductsData"
        this.$store.dispatch('admin/menu/getMenusData', this.search)
    },

    //method "changePage"
    changePage(page) {

        //commit to mutation "SET_PAGE"
        this.$store.commit('admin/menu/setPage', page)
        this.$router.push({
          name: 'admin-menus',
          query: {
            page: this.qParams
          }
        })

        //dispatch on action "getProductsData"
        this.$store.dispatch('admin/menu/getMenusData', this.search)
    },
    destroyMenu(id) {
      this.$buefy.dialog.confirm({
          title: 'Deleting account',
          message: 'Are you sure you want to <b>delete</b> your account? This action cannot be undone.',
          confirmText: 'Delete Account',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => {

            // dispatch to action "deleteMenu" vuex
            this.$store.dispatch('admin/menu/destroyMenu', id)
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
    height: 17rem;
  }
</style>
