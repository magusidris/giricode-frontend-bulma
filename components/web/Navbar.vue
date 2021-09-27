<template>
  <nav class="navbar has-background-info-dark is-link" role="navigation" aria-label="main navigation">
    <div class="container">
      <div id="navbarBasicExample" class="navbar-menu mx-6">
        <div class="navbar-start">

          <nav-link :to="menu.url" class="navbar-item" v-for="menu in menus" :key="menu.id">
            {{ menu.name }}
          </nav-link>

        </div>

        <div class="navbar-end">
          <template v-if="!isAuth">
            <div class="navbar-item">
              <div class="buttons">
                <nuxt-link to="/register" class="button is-primary">
                  <strong>Sign up</strong>
                </nuxt-link>
                <nuxt-link to="/login" class="button is-light">
                  Log in
                </nuxt-link>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="navbar-item">
              <div class="buttons">
                {{ user.username }}
                <a @click="logout" class="ml-3 button is-light">
                  Logout
                </a>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      isActive: false
    }
  },
  computed: {
    ...mapGetters({
      'isAuth': 'isAuthenticated',
      'user': 'authUser',
      'isProgrammer': 'isProgrammer',
      'isAdmin' : 'isAdmin'
  }),
    // menus
    menus() {
      return this.$store.state.web.menu.menus
    }
  },

  // hook "fetch"
  async fetch() {

    // fetching menus on Rest API
    await this.$store.dispatch('web/menu/getMenusData')
  },
  methods: {
    async logout() {
      // logout auth
      await this.$auth.logout()

      // redirect route login
      this.$router.push('/login')
    }
  }
}
</script>
