<template>
  <nav class="navbar is-dark-green" role="navigation" aria-label="main navigation">
    <div class="container is-max-widescreen">
      <div class="navbar-brand">
        <a @click="isActive = !isActive"
          :class="{'is-active': isActive}"
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div :class="{'is-active': isActive}"
            id="navbarBasicExample"
            class="navbar-menu">
        <div class="navbar-start">
          <nav-link :to="menu.url" class="navbar-item green" v-for="menu in menus" :key="menu.id">
            {{ menu.name }}
          </nav-link>
        </div>

        <div class="navbar-end">
          <template v-if="!isAuthenticated">
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
                <a class="button is-light-green">
                  <figure v-if="authUser.image !== null" class="image is-32x32 mr-2">
                    <nuxt-img class="is-rounded" :src="`/storage/users/`+authUser.image" :alt="authUser.username" />
                  </figure>
                  <figure v-else class="image is-32x32 mr-2">
                    <img class="is-rounded" src="https://b.kisscc0.com/20180718/urw/kisscc0-ninja-computer-icons-samurai-youtube-avatar-ninja-5b4ed903c2dd20.4931332915318940197982.jpg">
                  </figure>
                  {{ authUser.username }}
                </a>
                <nuxt-link v-if="isProgrammer || isAdmin || isOperator" :to="{name: 'admin-dashboard'}" class="button is-light">
                  Admin
                </nuxt-link>
                <a @click="logout" class="button is-danger">
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
    ...mapGetters([
      'isAuthenticated', 'authUser', 'isProgrammer', 'isAdmin', 'isOperator'
    ]),
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
