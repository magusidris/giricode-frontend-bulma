<template>
  <section class="section">
    <div class="container ct-height">
      <div class="columns h-100 is-vcentered">
        <div class="column is-4 is-offset-4">
          <div class="card">
            <header class="card-header has-text-centered">
              <div class="media-content py-5">
                <h3 class="title has-text-grey"><strong>Register</strong><br /></h3>
              </div>
            </header>
            <div class="card-content pb-5">
              <div class="content">
                <div v-if="validation.message" class="mb-3">
                  <b-message type="is-danger">
                    {{ validation.message }}
                  </b-message>
                </div>
                <form @submit.prevent="register">
                  <b-field>
                    <b-input
                        v-model="form.name"
                        type="text"
                        icon="account"
                        placeholder="Name">
                    </b-input>
                  </b-field>
                  <p v-if="validation.name" class="help is-danger">{{ validation.name[0] }}</p>
                  <b-field>
                    <b-input
                        v-model="form.username"
                        type="text"
                        icon="id-card"
                        placeholder="Username">
                    </b-input>
                  </b-field>
                  <p v-if="validation.username" class="help is-danger">{{ validation.username[0] }}</p>
                  <b-field>
                    <b-input
                        v-model="form.email"
                        type="email"
                        icon="email"
                        placeholder="Email">
                    </b-input>
                  </b-field>
                  <p v-if="validation.email" class="help is-danger">{{ validation.email[0] }}</p>
                  <b-field>
                    <b-input
                        v-model="form.password"
                        type="password"
                        icon="lock"
                        password-reveal
                        placeholder="Password">
                    </b-input>
                  </b-field>
                  <p v-if="validation.password" class="help is-danger">{{ validation.password[0] }}</p>
                  <b-field>
                    <b-input
                        v-model="form.password_confirmation"
                        type="password"
                        icon="lock"
                        password-reveal
                        placeholder="Konfirmasi Password">
                    </b-input>
                  </b-field>
                  <button type="submit" class="button is-fullwidth is-dark-green">Register</button>
                </form>
              </div>
              <div class="has-text-centered">
                Sudah punya akun? <nuxt-link :to="{name: 'login'}" class="has-text-weight-bold">Login Disini</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  // layout
  layout: 'default',
  middleware: 'guest',

  data() {
    return {
      form: {
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      // validation
      validation: []
    }
  },
  methods: {

    // method "register"
    async register() {

      // dispatch to action "store User Register"
      await this.$store.dispatch('web/user/register', {
        name: this.form.name,
        username: this.form.username,
        email: this.form.email,
        password: this.form.password,
        password_confirmation: this.form.password_confirmation
      })
      .then(async () => {
          await this.$auth.loginWith('jwt', {
          data: {
            username: this.form.username,
            password: this.form.password
          }
        })
        .then(() => {

          // redirect
          this.$router.push('/')
        })
      })
      .catch(error => {
        this.validation = error.response.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .card-header:first-child, .card-content:first-child, .card-footer:first-child {
    border-top: 3px solid $dark-green;
  }
</style>
