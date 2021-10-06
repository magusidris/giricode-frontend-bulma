<template>
  <div>
    <admin-title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <admin-card-component title="Tambah Kategori Baru" class="has-table has-mobile-sort-spaced">
        <section class="mx-3 my-3">
          <div v-if="validation.message" class="mb-3">
            <b-message type="is-danger">
              {{ validation.message }}
            </b-message>
          </div>
          <form @submit.prevent="storeCategory">
            <b-field>
              <b-upload v-model="category.image" drag-drop expanded>
                <section class="section">
                  <div class="content has-text-centered">
                    <p>
                      <b-icon icon="upload" size="is-large"></b-icon>
                    </p>
                    <p>Drop your files here or click to upload</p>
                  </div>
                </section>
              </b-upload>
            </b-field>
            <div class="tags">
                <span v-if="category.image" class="tag is-primary">
                  {{ category.image.name }}
                </span>
              </div>
            <div v-if="validation.name" class="mt-2 mb-3">
              <b-message type="is-danger">
                {{ validation.name[0] }}
              </b-message>
            </div>
            <b-field label="Nama Kategori">
              <b-input v-model="category.name" value="" placeholder="Masukkan Nama Kategori"></b-input>
            </b-field>
            <div v-if="validation.name" class="mt-2 mb-3">
              <b-message type="is-danger">
                {{ validation.name[0] }}
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
export default {
  layout: 'admin',
  data() {
    return {
      category: {
        image: null,
        name: ''
      },
      // validation
      validation: []
    }
  },
  computed: {
    titleStack() {
      return ['Admin', 'Kategori', 'Tambah']
    }
  },
  methods: {

    deleteDropFile(index) {
      this.category.image.splice(index, 1);
    },

    //handle file upload
      handleFileChange(e) {

        //get image
        let image = this.category.image = e.target.files[0]

        //check fileType
        if (!image.type.match('image.*')) {

          //if fileType not allowed, then clear value and set null
          e.target.value = ''

          //set state "category.image" to null
          this.category.image = null

          //show sweet alert
          this.$swal.fire({
            title: 'OOPS!',
            text: "Format File Tidak Didukung!",
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
          })
        }

      },

    // method "storeCategory"
    async storeCategory() {

      // define formData
      let formData = new FormData();

      formData.append('image', this.category.image)
      formData.append('name', this.category.name)

      // sending data to action "storeCategory" vuex
      await this.$store.dispatch('admin/category/storeCategory', formData)

        // success
        .then(() => {

          // sweet alert
          this.$buefy.snackbar.open(`Data Berhasil Disimpan!`)

          // redirect route "admin-categories"
          this.$router.push({
            name: 'admin-categories'
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
