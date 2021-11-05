<template>
  <section class="section">
    <div class="container ct-height">
      <div class="columns h-100 is-vcentered">
        <div class="column is-4 is-offset-4">
          <div class="card">
            <header class="card-header has-text-centered">
              <div class="media-content py-5">
                <h3 class="title has-text-grey"><strong>Login</strong><br /></h3>
              </div>
            </header>
            <div class="card-content pb-5">
              <div class="content">
                <div v-if="validation.message" class="mb-3">
                  <b-message type="is-danger">
                    {{ validation.message }}
                  </b-message>
                </div>
                <form @submit.prevent="login">
                  <b-field>
                    <b-input
                      v-model="form.username"
                      type="text"
                      icon="email"
                      placeholder="Email atau Username">
                    </b-input>
                  </b-field>
                  <p v-if="validation.username" class="help is-danger">{{ validation.username[0] }}</p>
                  <b-field>
                    <b-input v-model="form.password"
                      type="password"
                      placeholder="Password"
                      icon="lock"
                      password-reveal>
                    </b-input>
                  </b-field>
                  <p v-if="validation.password" class="help is-danger">{{ validation.password[0] }}</p>
                  <button type="submit" class="button is-fullwidth is-dark-green">Login</button>
                </form>
              </div>
              <div class="has-text-centered">
                Belum punya akun? <nuxt-link :to="{name: 'register'}" class="has-text-weight-bold">Daftar Sekarang</nuxt-link>
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
  middleware: 'guest',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      // validation
      validation: []
    }
  },

  methods: {
    async login() {

      await this.$auth.loginWith('jwt', {
        data: {
          username: this.form.username,
          password: this.form.password
        }
      })

      .then(() => {
        // redirect
        this.$router.push({
          name: 'index'
        })

      })
      .catch(error => {
        // assign validation
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
