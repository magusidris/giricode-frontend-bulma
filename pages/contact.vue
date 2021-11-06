<template>
  <div>
    <section class="section">
      <div class="container is-max-desktop">
        <div class="columns">
          <div class="column">
            <div class="card">
              <header class="card-header has-text-centered">
                <div class="media-content py-5">
                  <h3 class="title has-text-dark-green"><strong>Contact</strong><br /></h3>
                </div>
              </header>
              <div class="card-content">
                <div class="content is-medium">
                  <p>Terimakasih banyak kepada teman-teman yang telah berkunjung di <nuxt-link to="/">giricode.com</nuxt-link> dan sudah membaca dan mempelajari tutorial-tutorial pemrograman di <nuxt-link to="/">giricode.com</nuxt-link>. Untuk teman-teman yang ingin menghubungi kami untuk tujuan bertanya atau untuk hal lainnya. teman-teman bisa mengirimkan pesan ke email : </p>
                  <ul>
                    <li>info@giricode.com</li>
                    <li>nuxtcraft@gmail.com</li>
                  </ul>
                  <p>Social Media : </p>
                  <ul>
                    <li><a href="https://www.facebook.com/giricode">Facebook</a></li>
                    <li><a href="https://github.com/nuxtcraft">Github</a></li>
                  </ul>

                  <p>Terimakasih</p>
                  <b>pembuat,</b>
                  <p>Mochammad Agus Idris</p>

                  <h6>Dapat juga mengirim pada form berikut : </h6>
                  <a @click.prevent="isOpen=true">Kirim kritik & saran</a>
                </div>

                <b-modal v-model="isOpen" :width="540" scroll="keep">
                  <div class="card modal-contact">
                    <header class="modal-card-head has-text-centered has-text-weight-medium	">
                        <p class="modal-card-title has-text-dark-green is-size-4">Kritik & Saran</p>
                        <button
                            type="button"
                            class="delete"
                            @click="isOpen=false"/>
                    </header>
                    <section class="card-content">
                      <form @submit.prevent="postGuest">
                        <div class="field">
                          <label class="label">Nama</label>
                          <div class="control has-icons-left">
                            <input class="input is-success" v-model="guest.name" type="text" placeholder="Nama Anda">
                            <span class="icon is-small is-left">
                              <i class="fas fa-user"></i>
                            </span>
                          </div>
                          <p v-if="validation.name" class="help is-danger">{{ validation.name[0] }}</p>
                        </div>

                        <div class="field">
                          <label class="label">Email</label>
                          <div class="control has-icons-left">
                            <input class="input is-success" v-model="guest.email" type="email" placeholder="Email Anda">
                            <span class="icon is-small is-left">
                              <i class="fas fa-envelope"></i>
                            </span>
                          </div>
                          <p v-if="validation.email" class="help is-danger">{{ validation.email[0] }}</p>
                        </div>

                        <div class="field">
                          <label class="label">Judul</label>
                          <div class="control has-icons-left">
                            <input class="input is-success" v-model="guest.subject" type="text" placeholder="Judul Pesan">
                            <span class="icon is-small is-left">
                              <i class="fas fa-scroll"></i>
                            </span>
                          </div>
                          <p v-if="validation.subject" class="help is-danger">{{ validation.subject[0] }}</p>
                        </div>

                        <div class="field">
                          <label class="label">Pesan</label>
                          <div class="control">
                            <textarea class="textarea is-success" v-model="guest.body" placeholder="Isi Pesan"></textarea>
                          </div>
                          <p v-if="validation.body" class="help is-danger">{{ validation.body[0] }}</p>
                        </div>

                        <div class="field">
                          <div class="control">
                            <label class="checkbox">
                              <input v-model="isAgree" type="checkbox">
                              I agree to the <nuxt-link to="/terms">terms and conditions</nuxt-link>
                            </label>
                          </div>
                        </div>

                        <div class="field is-grouped">
                          <div class="control">
                            <button :disabled="!isAgree" class="button is-dark-green">Submit</button>
                          </div>
                          <b-button
                            label="Close"
                            @click="isOpen=false" />
                        </div>
                      </form>
                    </section>
                  </div>
                </b-modal>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      guest: {
        name: '',
        email: '',
        subject: '',
        body: ''
      },
      // validation
      validation: [],
      isOpen : false,
      isAgree: false
    }
  },
  methods : {
    async postGuest() {
      await this.$store.dispatch('web/guest/storeGuest', {
        name: this.guest.name,
        email: this.guest.email,
        subject: this.guest.subject,
        body: this.guest.body
      })
        .then(_ => {
          this.$buefy.snackbar.open(`Terimakasih`)
          this.isOpen = false
        })
        .catch(error => {
          this.validation = error.response.data
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .modal-contact {
    border-top: 3px solid $dark-green;
  }
</style>
