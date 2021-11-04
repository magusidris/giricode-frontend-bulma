<template>
  <div>
    <titlebar :title-stack="titleStack" />
    <section class="section is-main-section">
      <card-component title="Tambah Tag Baru" class="has-table has-mobile-sort-spaced">
        <section class="mx-3 my-3">
          <div v-if="validation.message" class="mb-3">
            <b-message type="is-danger">
              {{ validation.message }}
            </b-message>
          </div>
          <form @submit.prevent="storeTag">
            <b-field label="Nama Tag">
              <b-input v-model="form.name" value="" placeholder="Masukkan Nama Tag"></b-input>
            </b-field>
            <div v-if="validation.name" class="mt-2 mb-3">
              <b-message type="is-danger">
                {{ validation.name[0] }}
              </b-message>
            </div>
            <b-field label="Color">
              <b-select v-model="form.color" expanded>
                  <option value="">Pilih sebuah warna</option>
                  <option v-for="color in colors" :key="color.id" :value="color.id">{{ color.name }}</option>
              </b-select>
            </b-field>
            <div v-if="validation.color_id" class="mt-2 mb-3">
              <b-message type="is-danger">
                {{ validation.color_id[0] }}
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
      form: {
        name: '',
        color: '',
      },
      // validation
      validation: []
    }
  },
  computed: {
    titleStack() {
      return ['Admin', 'Tags', 'Tambah']
    },
    ...mapState({
      colors: state => state.admin.tag.colors
    })
  },
  async asyncData({ store }) {
    await store.dispatch('admin/tag/getColorsData')
  },
  methods: {
    // method "storeTag"
    async storeTag() {

      // define formData
      let formData = new FormData();

      formData.append('name', this.form.name)
      formData.append('color_id', this.form.color)

      // sending data to action "storeTag" vuex
      await this.$store.dispatch('admin/tag/storeTag', formData)

        // success
        .then(() => {

          // sweet alert
          this.$buefy.snackbar.open(`Data Berhasil Disimpan!`)

          // redirect route "admin-tags"
          this.$router.push({
            name: 'admin-tags'
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
