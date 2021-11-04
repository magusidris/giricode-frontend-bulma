<template>
  <div>
    <titlebar :title-stack="titleStack" />
    <section class="section is-main-section">
      <card-component title="Data Kategori" class="has-table has-mobile-sort-spaced">
        <b-field class="mt-3 mx-3">
            <p class="control">
                <b-button :to="{name: 'admin-sliders-create'}" tag="nuxt-link" type="is-danger" label="Tambah" icon-pack="fas" icon-left="plus-circle" />
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
            :per-page="sliders.per_page"
            :striped="true"
            :hoverable="true"
            default-sort="name"
            :data="sliders.data">
            <b-table-column label="Image" centered field="image" sortable v-slot="props">
              <nuxt-img
                :src="`/storage/sliders/`+props.row.image"
                :alt="props.row.name"
                preset="web"
                width="200px"
                sizes="sm:355px md:320px lg:480px" />
            </b-table-column>
            <b-table-column label="URL" centered field="url" sortable v-slot="props">
              {{ props.row.url }}
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
                  :to="{ name: 'admin-sliders-edit-id', params: { id: props.row.id } }"
                  class="button is-small is-primary"
                >
                  <b-icon icon="account-edit" size="is-small" />
                </nuxt-link>
                <button
                  class="button is-small is-danger"
                  type="button"
                  @click.prevent="destroySlider(props.row.id)"
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
          :total="sliders.total"
          :perPage="sliders.per_page">
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
      return ['Admin', 'Slider']
    },
    ...mapState({
      sliders: state => state.admin.slider.sliders,
      currentPage: state => state.admin.slider.sliders.current_page,
      qParams: state => state.admin.slider.page
    })
  },
  head() {
    return {
      title: 'Kategori — Admin Giricode',
    }
  },

  // hook "asyncData"
  async asyncData({ store, query }) {

    // this.$store.commit('admin/slider/setPage', page)
    await store.commit('admin/slider/setPage', query.page)
    await store.dispatch('admin/slider/getSlidersData')
  },

  methods: {
    //method "searchData"
    searchData() {

        //commit to mutation "SET_PAGE"
        this.$store.commit('admin/slider/setPage', 1)

        //dispatch on action "getProductsData"
        this.$store.dispatch('admin/slider/getSlidersData', this.search)
    },

    //method "changePage"
    changePage(page) {

        //commit to mutation "SET_PAGE"
        this.$store.commit('admin/slider/setPage', page)
        this.$router.push({
          name: 'admin-sliders',
          query: {
            page: this.qParams
          }
        })

        //dispatch on action "getProductsData"
        this.$store.dispatch('admin/slider/getSlidersData', this.search)
    },
    destroySlider(id) {
      this.$buefy.dialog.confirm({
          title: 'Deleting account',
          message: 'Are you sure you want to <b>delete</b> your account? This action cannot be undone.',
          confirmText: 'Delete Account',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => {

            // dispatch to action "deleteSlider" vuex
            this.$store.dispatch('admin/slider/destroySlider', id)
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
