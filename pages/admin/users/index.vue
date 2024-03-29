<template>
  <div>
    <titlebar :title-stack="titleStack" />
    <section class="section is-main-section">
      <card-component title="Data Kategori" class="has-table has-mobile-sort-spaced">
        <b-field class="mt-3 mx-3">
            <p class="control">
                <b-button :to="{name: 'admin-users-create'}" tag="nuxt-link" type="is-danger" label="Tambah" icon-pack="fas" icon-left="plus-circle" />
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
            :per-page="users.per_page"
            :striped="true"
            :hoverable="true"
            default-sort="name"
            :data="users.data">
            <b-table-column label="Image" centered field="image" sortable v-slot="props">
              <nuxt-img
                 v-if="props.row.image"
                :src="`/storage/users/`+props.row.image"
                :alt="props.row.name"
                preset="web"
                width="50px"
                sizes="sm:355px md:320px lg:480px" />
              <div v-else>
                Null
              </div>
            </b-table-column>
            <b-table-column label="Name" centered field="name" sortable v-slot="props">
              {{ props.row.name }}
            </b-table-column>
            <b-table-column label="Akses" centered field="role" sortable v-slot="props">
              {{ props.row.role }}
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
                  :to="{ name: 'admin-users-edit-id', params: { id: props.row.id } }"
                  class="button is-small is-dark-green"
                >
                  <b-icon pack="fas" icon="edit" size="is-small" />
                </nuxt-link>
                <button
                  class="button is-small is-danger"
                  type="button"
                  @click.prevent="destroyUser(props.row.id)"
                >
                  <b-icon pack="fas" icon="trash" size="is-small" />
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
          :total="users.total"
          :perPage="users.per_page">
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
      return ['Admin', 'User']
    },
    ...mapState({
      users: state => state.admin.user.users,
      currentPage: state => state.admin.user.users.current_page,
      qParams: state => state.admin.user.page
    })
  },
  head() {
    return {
      title: 'Kategori — Admin Giricode',
    }
  },

  // hook "asyncData"
  async asyncData({ store, query }) {

    // this.$store.commit('admin/user/setPage', page)
    await store.commit('admin/user/setPage', query.page)
    await store.dispatch('admin/user/getUsersData')
  },

  methods: {
    //method "searchData"
    searchData() {

        //commit to mutation "SET_PAGE"
        this.$store.commit('admin/user/setPage', 1)

        //dispatch on action "getProductsData"
        this.$store.dispatch('admin/user/getUsersData', this.search)
    },

    //method "changePage"
    changePage(page) {

        //commit to mutation "SET_PAGE"
        this.$store.commit('admin/user/setPage', page)
        this.$router.push({
          name: 'admin-users',
          query: {
            page: this.qParams
          }
        })

        //dispatch on action "getProductsData"
        this.$store.dispatch('admin/user/getUsersData', this.search)
    },
    destroyUser(id) {
      this.$buefy.dialog.confirm({
          title: 'Deleting account',
          message: 'Are you sure you want to <b>delete</b> your account? This action cannot be undone.',
          confirmText: 'Delete Account',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => {

            // dispatch to action "deleteUser" vuex
            this.$store.dispatch('admin/user/destroyUser', id)
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
