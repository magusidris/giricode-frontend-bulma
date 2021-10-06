<template>
  <div>
    <admin-title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <admin-card-component title="Edit Tag" class="has-table has-mobile-sort-spaced">
        <section class="mx-3 my-3">
          <div v-if="validation.message" class="mb-3">
            <b-message type="is-danger">
              {{ validation.message }}
            </b-message>
          </div>
          <form @submit.prevent="updateTag">
            <b-field label="Nama Tag">
              <b-input v-model="form.name" placeholder="Masukkan Nama Tag"></b-input>
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
      return ['Admin', 'Tags', 'Edit']
    },
    ...mapState({
      colors: state => state.admin.tag.colors
    })
  },
  mounted() {
    this.form.name = this.$store.state.admin.tag.tag.name,
    this.form.color = this.$store.state.admin.tag.tag.color_id
  },
  async asyncData({ store, route }) {
    await store.dispatch('admin/tag/getDetailTag', route.params.id)
    await store.dispatch('admin/tag/getColorsData')
  },
  methods: {
    // method "storeTag"
    async updateTag() {

      // define formData
      let formData = new FormData();

      formData.append('name', this.form.name)
      formData.append('color_id', this.form.color)
      formData.append('_method', 'PATCH')

      // sending data to action "storeTag" vuex
      await this.$store.dispatch('admin/tag/updateTag', {
        tagId: this.$route.params.id,
        payload: formData
      })

        // success
        .then(() => {

          // sweet alert
          this.$buefy.snackbar.open(`Data Berhasil Diupdate!`)

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
