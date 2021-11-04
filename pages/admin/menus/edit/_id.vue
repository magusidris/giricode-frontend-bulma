<template>
  <div>
    <titlebar :title-stack="titleStack" />
    <section class="section is-main-section">
      <card-component title="Edit Menu" class="has-table has-mobile-sort-spaced">
        <section class="mx-3 my-3">
          <div v-if="validation.message" class="mb-3">
            <b-message type="is-danger">
              {{ validation.message }}
            </b-message>
          </div>
          <form @submit.prevent="updateMenu">
            <b-field label="Nama Menu">
              <b-input v-model="menu.name" placeholder="Masukkan Nama Menu"></b-input>
            </b-field>
            <div v-if="validation.name" class="mt-2 mb-3">
              <b-message type="is-danger">
                {{ validation.name[0] }}
              </b-message>
            </div>
            <b-field label="URL">
              <b-input v-model="menu.url" value="" placeholder="Masukkan URL"></b-input>
            </b-field>
            <div v-if="validation.url" class="mt-2 mb-3">
              <b-message type="is-danger">
                {{ validation.url[0] }}
              </b-message>
            </div>
            <div class="buttons mt-4">
              <b-button
                icon-pack="fas"
                native-type="submit"
                type="is-primary"
                icon-left="paper-plane">
                Save
              </b-button>
              <b-button
                icon-pack="fas"
                native-type="reset"
                type="is-danger"
                icon-left="redo">
                Reset
              </b-button>
            </div>
          </form>
        </section>
      </card-component>
    </section>
  </div>
</template>

<script>
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
      menu: {
        name: '',
        url: ''
      },
      // validation
      validation: []
    }
  },
  computed: {
    titleStack() {
      return ['Admin', 'Menu', 'Edit']
    }
  },
  mounted() {
    this.menu.name = this.$store.state.admin.menu.menu.name,
    this.menu.url = this.$store.state.admin.menu.menu.url
  },
  async asyncData({ store, route }) {
    await store.dispatch('admin/menu/getDetailMenu', route.params.id)
  },
  methods: {
    // method "storeMenu"
    async updateMenu() {

      // define formData
      let formData = new FormData();

      formData.append('name', this.menu.name)
      formData.append('url', this.menu.url)
      formData.append('_method', 'PATCH')

      // sending data to action "storeTag" vuex
      await this.$store.dispatch('admin/menu/updateMenu', {
        menuId: this.$route.params.id,
        payload: formData
      })

        // success
        .then(() => {

          // sweet alert
          this.$buefy.snackbar.open(`Data Berhasil Diupdate!`)

          // redirect route "admin-tags"
          this.$router.push({
            name: 'admin-menus'
          })
        })

        // error
        .catch(error => {

          // assign error to state "validation"
          this.validation = error.response.data
        })
    }
  }
}
</script>
