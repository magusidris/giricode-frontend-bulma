<template>
  <aside v-show="isAsideVisible" class="sidebar aside sidebar-page is-placed-left is-expanded">
    <aside-tools :is-main-menu="true">
      <span slot="label"> <b>Admin Giricode</b> </span>
    </aside-tools>
    <div class="menu is-menu-main">
      <template v-for="(menuGroup, index) in menu">
        <p v-if="typeof menuGroup === 'string'" :key="index" class="menu-label">
          {{ menuGroup }}
        </p>
        <aside-menu-list
          v-else
          :key="index"
          :menu="menuGroup"
          @menu-click="menuClick"
        />
      </template>
    </div>
  </aside>
</template>

<script>
import { mapState } from 'vuex'
import AsideTools from '@/components/admin/AsideTools'
import AsideMenuList from '@/components/admin/AsideMenuList'
export default {
  name: 'AsideMenu',
  components: { AsideTools, AsideMenuList },
  props: {
    menu: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapState(['isAsideVisible']),
  },
  methods: {
    menuClick(item) {
      //
    },
  },
}
</script>
