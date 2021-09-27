<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="column is-4 is-offset-4">
          <div class="card">
            <header class="card-header has-text-centered">
              <div class="media-content py-5">
                <h3 class="title has-text-grey"><strong>Register</strong><br /></h3>
              </div>
            </header>
            <div class="card-content pb-5">
              <div class="content">
                <form>
                  <div class="field">
                    <p class="control has-icons-left">
                      <input class="input" type="text" placeholder="Name">
                      <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <p class="control has-icons-left">
                      <input class="input" type="text" placeholder="Username">
                      <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <p class="control has-icons-left">
                      <input class="input" type="text" placeholder="Email">
                      <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <p class="control has-icons-left">
                      <input class="input" type="password" placeholder="Password">
                      <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <p class="control has-icons-left">
                      <input class="input" type="password" placeholder="Konfirmasi Password">
                      <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                      </span>
                    </p>
                  </div>
                  <button class="button is-fullwidth is-info">Register</button>
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

<style lang="scss" scoped>
  .card-header:first-child, .card-content:first-child, .card-footer:first-child {
    border-top: 3px solid $info;
}
</style>
