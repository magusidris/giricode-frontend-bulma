<template>
  <nav v-show="isNavBarVisible" id="navbar-main" class="navbar is-fixed-top">
    <div class="navbar-brand">
      <a
        class="navbar-item is-hidden-desktop"
        @click.prevent="menuToggleMobile"
      >
        <b-icon :icon="menuToggleMobileIcon" />
      </a>
      <!-- <div class="navbar-item has-control no-left-space-touch">
        <div class="control">
          <input class="input" placeholder="Search everywhere..." />
        </div>
      </div> -->
    </div>
    <div class="navbar-brand is-right">
      <a
        class="navbar-item navbar-item-menu-toggle is-hidden-desktop"
        @click.prevent="menuNavBarToggle"
      >
        <b-icon :icon="menuNavBarToggleIcon" custom-size="default" />
      </a>
    </div>
    <div
      class="navbar-menu fadeIn animated faster"
      :class="{ 'is-active': isMenuNavBarActive }"
    >
      <div class="navbar-end">
        <nuxt-link
          to="/admin/about"
          class="navbar-item has-divider is-desktop-icon-only"
          title="About">
          <b-icon icon="help-circle-outline" custom-size="default" />
          <span>About</span>
        </nuxt-link>
        <nuxt-link
          to="/"
          class="navbar-item has-divider is-desktop-icon-only"
          title="Home">
          <b-icon icon="home" custom-size="default" />
          <span>Home</span>
        </nuxt-link>
        <nav-bar-menu class="has-divider has-user-avatar">
          <user-avatar />
          <div v-if="isAuthenticated" class="is-user-name">
            <span>{{ authUser.username }}</span>
          </div>

          <div slot="dropdown" class="navbar-dropdown">
            <nuxt-link
              to="/profile"
              class="navbar-item"
              exact-active-class="is-active"
            >
              <b-icon icon="account" custom-size="default" />
              <span>My Profile</span>
            </nuxt-link>
            <a class="navbar-item">
              <b-icon icon="cog" custom-size="default"></b-icon>
              <span>Settings</span>
            </a>
            <a class="navbar-item">
              <b-icon icon="email" custom-size="default"></b-icon>
              <span>Messages</span>
            </a>
            <hr class="navbar-divider" />
            <a class="navbar-item">
              <b-icon icon="logout" custom-size="default"></b-icon>
              <span>Log Out</span>
            </a>
          </div>
        </nav-bar-menu>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import NavBarMenu from '@/components/admin/NavBarMenu'
import UserAvatar from '@/components/admin/UserAvatar'

export default {
  name: 'NavBar',
  components: {
    UserAvatar,
    NavBarMenu,
  },
  data() {
    return {
      isMenuNavBarActive: false,
    }
  },
  computed: {
    menuNavBarToggleIcon() {
      return this.isMenuNavBarActive ? 'close' : 'dots-vertical'
    },
    menuToggleMobileIcon() {
      return this.isAsideMobileExpanded ? 'backburger' : 'forwardburger'
    },
    ...mapState([
      'isNavBarVisible', 'isAsideMobileExpanded'
    ]),
    ...mapGetters([
      'authUser', 'isAuthenticated', 'isProgrammer', 'isAdmin', 'isOperator'
    ])
  },
  methods: {
    menuToggleMobile() {
      this.$store.commit('asideMobileStateToggle')
    },
    menuNavBarToggle() {
      this.isMenuNavBarActive = !this.isMenuNavBarActive
    },
    logout() {
      this.$buefy.snackbar.open({
        message: 'Log out clicked',
        queue: false,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  a.is-active.nuxt-link-active {
    background: red!important;
  }
</style>
