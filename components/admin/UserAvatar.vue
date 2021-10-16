<template>
  <div v-if="isAuthenticated" class="is-user-avatar">
    <nuxt-img :src="`/storage/users/`+authUser.image" :alt="authUser.username" />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'UserAvatar',
  props: {
    avatar: {
      type: String,
      default: null,
    },
  },
  computed: {
    newUserAvatar() {
      if (this.avatar) {
        return this.avatar
      }

      if (this.userAvatar) {
        return this.userAvatar
      }

      let name = 'somename'

      if (this.userName) {
        name = this.userName.replace(/[^a-z0-9]+/i, '')
      }

      return `https://avatars.dicebear.com/v2/human/${name}.svg?options[mood][]=happy`
    },
    ...mapState(['userAvatar', 'userName']),

    ...mapGetters([
      'authUser', 'isAuthenticated'
    ])
  },
}
</script>
