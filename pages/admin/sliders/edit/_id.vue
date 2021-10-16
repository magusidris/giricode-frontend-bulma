<template>
  <div>
    <admin-title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <admin-card-component title="Edit Slider" class="has-table has-mobile-sort-spaced">
        <section class="mx-3 my-3">
          <div v-if="validation.message" class="mb-3">
            <b-message type="is-danger">
              {{ validation.message }}
            </b-message>
          </div>
          <form @submit.prevent="updateSlider">
            <b-field>
              <b-upload v-model="slider.image" drag-drop expanded>
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
              <span v-if="slider.image" class="tag is-primary">
                {{ slider.image.name }}
              </span>
            </div>
            <div v-if="validation.image" class="mt-2 mb-3">
              <b-message type="is-danger">
                {{ validation.image[0] }}
              </b-message>
            </div>
            <b-field label="URL">
              <b-input v-model="slider.url" value="" placeholder="Masukkan URL"></b-input>
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
      </admin-card-component>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      slider: {
        image: null,
        url: ''
      },
      // validation
      validation: []
    }
  },
  computed: {
    titleStack() {
      return ['Admin', 'Slider', 'Edit']
    },
  },
  mounted() {
    this.slider.url = this.$store.state.admin.slider.slider.url
  },
  async asyncData({ store, route }) {
    await store.dispatch('admin/slider/getDetailSlider', route.params.id)
  },
  methods: {

    //handle file upload
    handleFileChange(e) {

      //get image
      let image = this.slider.image = e.target.files[0]

      //check fileType
      if (!image.type.match('image.*')) {

        //if fileType not allowed, then clear value and set null
        e.target.value = ''

        //set state "slider.image" to null
        this.slider.image = null

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

    // method "updateSlider"
    async updateSlider() {

      // define formData
      let formData = new FormData();

      formData.append('image', this.slider.image)
      formData.append('url', this.slider.url)
      formData.append('_method', 'PATCH')

      // sending data to action "updateSlider" vuex
      await this.$store.dispatch('admin/slider/updateSlider', {
        sliderId: this.$route.params.id,
        payload: formData
      })

        // success
        .then(() => {

          // sweet alert
          this.$buefy.snackbar.open(`Data Berhasil Diupdate!`)

          // redirect route "admin-sliders"
          this.$router.push({
            name: 'admin-sliders'
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
