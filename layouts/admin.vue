<template>
  <div>
    <admin-nav-bar />
    <admin-aside-menu :menu="menu" />
    <nuxt id="admin" />
    <admin-footer-bar />
  </div>
</template>

<script>

export default {
  name: 'Home',
  middleware: 'operator',
  computed: {
    menu() {
      return [
        'General',
        [
          {
            to: '/admin',
            icon: 'desktop-mac',
            label: 'Dashboard',
          },
        ],
        'Content',
        [
          {
            to: '/admin/tags',
            label: 'Tags',
            icon: 'tag-multiple',
          },
          {
            to: '/admin/categories',
            label: 'Kategori',
            icon: 'folder-multiple',
          },
          {
            to: '/admin/blogs',
            label: 'Blog',
            icon: 'book-open',
          }
        ],
        'Settings',
        [
          {
            to: '/admin/menus',
            label: 'Menu',
            icon: 'select-multiple',
          },
          {
            to: '/admin/sliders',
            label: 'Slider',
            icon: 'folder-multiple-image',
          },
          {
            to: '/admin/users',
            label: 'User',
            icon: 'account-multiple',
          },
        ]
      ]
    },
  },
  created() {
    this.$store.commit('user', {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://avatars.dicebear.com/v2/gridy/John-Doe.svg',
    })
  },
  mounted() {
    document.documentElement.classList.add('has-aside-left')
    document.documentElement.classList.add('has-aside-mobile-transition')
    document.documentElement.classList.add('has-navbar-fixed-top')
    document.documentElement.classList.add('has-aside-expanded')
  },
}
</script>

<style lang="scss" scoped>
// @import '~/assets/scss/admin/main'

</style>

