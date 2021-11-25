<template>
  <div>
    <navbar />
    <!-- <admin-aside-menu :menu="menu" /> -->
    <sidebar />
    <nuxt id="admin" />
    <footerbar />
  </div>
</template>

<script>
import Navbar from '@/components/admin/NavBar'
import Sidebar from '@/components/admin/Sidebar'
import Footerbar from '@/components/admin/FooterBar'
export default {
  name: 'admin',
  middleware: 'operator',
  components: {
    Navbar,
    Sidebar,
    Footerbar
  },
  data() {
    return {
      isExpand: false
    }
  },
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
          },
          {
            to: '/admin/blogseries',
            label: 'Blog Series',
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
  mounted() {
    document.documentElement.classList.add('has-aside-left')
    document.documentElement.classList.add('has-aside-mobile-transition')
    document.documentElement.classList.add('has-navbar-fixed-top')
    document.documentElement.classList.add('has-aside-expanded')
  },
}
</script>

<style lang="scss" scoped>
// .navbar-link {
//   padding-right: $navbar-item-h-padding;
//   padding-left: $navbar-item-h-padding;
// }
</style>

