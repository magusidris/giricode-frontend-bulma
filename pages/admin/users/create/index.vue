<template>
  <div>
    <titlebar :title-stack="titleStack" />
    <section class="section is-main-section">
      <card-component title="Tambah User Baru" class="has-table has-mobile-sort-spaced">
        <section class="mx-3 my-3">
          <div v-if="validation.message" class="mb-3">
            <b-message type="is-danger">
              {{ validation.message }}
            </b-message>
          </div>
          <form @submit.prevent="storeUser">
            <div class="columns is-centered is-vcentered">
              <div class="column is-full-mobile">
                  <div class="image-container">
                    <template v-if="avatar">
                      <figure class="image is-600x600">
                        <cropper
                          class="cropper"
                          :src="avatar"
                          :default-size="defaultSize"
                          :stencil-props="{
                            aspectRatio: 1/1
                          }"
                          stencil-component="circle-stencil"
                          ref="cropper" />
                      </figure>
                    </template>
                    <template v-else>
                      <figure class="image is-600x600">
                        <img src="https://bulma.io/images/placeholders/256x256.png">
                      </figure>
                    </template>
                    <div class="pt-3" style="max-width: 15rem;">
                      <button class="button is-primary is-fullwidth" v-if="avatar" @click="crop">
                        Crop
                      </button>
                    </div>
                  </div>
              </div>
              <div class="column is-10-fullhd is-9-widescreen is-8-desktop is-7-tablet">
                <div class="file is-info has-name">
                  <label class="file-label">
                    <input class="file-input" type="file" @change="handleFileChange" name="resume">
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fas fa-upload"></i>
                      </span>
                      <span class="file-label">
                        Choose a file…
                      </span>
                    </span>
                    <span v-if="user.image" class="file-name">
                      {{ user.image.name }}
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div v-if="validation.image" class="mt-2 mb-3">
              <b-message type="is-danger">
                {{ validation.image[0] }}
              </b-message>
            </div>
            <b-field label="Role">
              <client-only placeholder="loading...">
                <multiselect v-model="user.role" :options="roles" placeholder="Hak Akses User">
                </multiselect>
              </client-only>
            </b-field>
            <div v-if="validation.role" class="mt-2 mb-3">
              <b-message type="is-danger">
                {{ validation.role[0] }}
              </b-message>
            </div>
            <b-field label="Nama User">
              <b-input v-model="user.name" value="" placeholder="Masukkan Nama Lengkap"></b-input>
            </b-field>
            <div v-if="validation.name" class="mt-2 mb-3">
              <b-message type="is-danger">
                {{ validation.name[0] }}
              </b-message>
            </div>
            <b-field label="Info">
              <b-input v-model="user.info" maxlength="200" type="textarea" placeholder="Ketikkan Tentang Profil Anda"></b-input>
            </b-field>
            <div v-if="validation.info" class="mt-2 mb-3">
              <b-message type="is-danger">
                {{ validation.info[0] }}
              </b-message>
            </div>
            <b-field label="Username">
              <b-input v-model="user.username" value="" placeholder="Masukkan Username"></b-input>
            </b-field>
            <div v-if="validation.username" class="mt-2 mb-3">
              <b-message type="is-danger">
                {{ validation.username[0] }}
              </b-message>
            </div>
            <b-field label="Email">
              <b-input v-model="user.email" type="email" value="" placeholder="Masukkan Email"></b-input>
            </b-field>
            <div v-if="validation.email" class="mt-2 mb-3">
              <b-message type="is-danger">
                {{ validation.email[0] }}
              </b-message>
            </div>
            <b-field label="Password">
              <b-input v-model="user.password" value="" placeholder="Masukkan Password"></b-input>
            </b-field>
            <div v-if="validation.password" class="mt-2 mb-3">
              <b-message type="is-danger">
                {{ validation.password[0] }}
              </b-message>
            </div>
            <b-field label="Konfirmasi Password">
              <b-input v-model="user.password_confirmation" value="" placeholder="Masukkan Password Sekali Lagi"></b-input>
            </b-field>
            <div v-if="validation.password_confirmation" class="mt-2 mb-3">
              <b-message type="is-danger">
                {{ validation.password_confirmation[0] }}
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
import { mapGetters } from 'vuex'
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
      roles: ['guest', 'operator', 'admin', 'programmer'],
      user: {
        role: '',
        image: null,
        name: '',
        info: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      // validation
      validation: [],
      coordinates: {
				width: 0,
				height: 0,
				left: 0,
				top: 0,
			},
      avatar: null
    }
  },
  computed: {
    titleStack() {
      return ['Admin', 'User', 'Tambah']
    },
    ...mapGetters([
      'authUser'
    ]),
  },
  mounted() {
    this.user.role = this.authUser.role
  },
  methods: {
    defaultSize({ imageSize, visibleArea }) {
			return {
				width: (visibleArea || imageSize).width,
				height: (visibleArea || imageSize).height,
			};
		},
    crop() {
			const { coordinates, canvas, } = this.$refs.cropper.getResult();
			this.coordinates = coordinates;
			// You able to do different manipulations at a canvas
			// but there we just get a cropped image, that can be used
			// as src for <img/> to preview result
			this.avatar = canvas.toDataURL();
		},
    //handle file upload
    handleFileChange(e) {

      //get image
      let image = this.user.image = e.target.files[0]
      let reader = new FileReader();
      reader.readAsDataURL(image);

      //check fileType
      if (!image.type.match('image.*')) {

        //if fileType not allowed, then clear value and set null
        e.target.value = ''

        //set state "user.image" to null
        this.user.image = null

        //show sweet alert
        this.$swal.fire({
          title: 'OOPS!',
          text: "Format File Tidak Didukung!",
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        })
      }

      reader.onload = e => {
        this.avatar = e.target.result
        // console.log(e)
      }

    },

    // method "storeUser"
    async storeUser() {

      let image = this.user.image

      // define formData
      let formData = new FormData();

      if (!image) {
        formData.append('role', this.user.role)
        formData.append('image', '')
        formData.append('name', this.user.name)
        formData.append('info', this.user.info)
        formData.append('username', this.user.username)
        formData.append('email', this.user.email)
        formData.append('password', this.user.password)
        formData.append('password_confirmation', this.user.password_confirmation)

        // sending data to action "storeUser" vuex
        await this.$store.dispatch('admin/user/storeUser', formData)
        // success
        .then(() => {

          // sweet alert
          this.$buefy.snackbar.open(`Data Berhasil Disimpan!`)

          // redirect route "admin-users"
          this.$router.push({
            name: 'admin-users'
          })
        })

        // error
        .catch(error => {

          // assign error to state "validation"
          this.validation = error.response.data
        })
      } else {

        const { canvas } = this.$refs.cropper.getResult();

        if (canvas) {
          await canvas.toBlob(blob => {
          formData.append('role', this.user.role)
          formData.append('image', blob)
          formData.append('name', this.user.name)
          formData.append('info', this.user.info)
          formData.append('username', this.user.username)
          formData.append('email', this.user.email)
          formData.append('password', this.user.password)
          formData.append('password_confirmation', this.user.password_confirmation)

          // sending data to action "storeUser" vuex
          this.$store.dispatch('admin/user/storeUser', formData)
            // success
            .then( async () => {

              // sweet alert
              this.$buefy.snackbar.open(`Data Berhasil Disimpan!`)
              await this.$auth.fetchUser()

              // redirect route "admin-users"
              this.$router.push({
                name: 'admin-users'
              })
            })

            // error
            .catch(error => {

              // assign error to state "validation"
              this.validation = error.response.data
            })
          }, 'image/jpeg');
        }
      }
    }
  }
}
</script>
