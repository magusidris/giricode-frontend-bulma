<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
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
                  <div class="field">
                    <p class="control has-icons-left">
                      <input class="input" v-model="form.username" type="text" placeholder="Email atau Username">
                      <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                      </span>
                    </p>
                  </div>
                  <div v-if="validation.username" class="mt-2 mb-3">
                    <b-message type="is-danger">
                      {{ validation.username[0] }}
                    </b-message>
                  </div>
                  <div class="field">
                    <p class="control has-icons-left">
                      <input class="input" v-model="form.password" type="password" placeholder="Password">
                      <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                      </span>
                    </p>
                  </div>
                  <div v-if="validation.password" class="mt-2 mb-3">
                    <b-message type="is-danger">
                      {{ validation.password[0] }}
                    </b-message>
                  </div>
                  <button type="submit" class="button is-fullwidth is-info">Login</button>
                </form>
              </div>
              <div class="has-text-centered">
                Belum punya akun? <nuxt-link :to="{name: 'register'}">Daftar Sekarang</nuxt-link>
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
    border-top: 3px solid $info;
}
</style>
