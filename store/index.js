export const state = () => ({
  user: null
})

export const getters = {
  authUser(rootState) {
    return rootState.auth.user.user || null
  },

  isAuthenticated(rootState) {
    return !!rootState.auth.loggedIn
  },

  isAdmin(rootState) {
    return rootState.auth.user &&
           rootState.auth.user.role &&
           rootState.auth.user.role === 'admin' ||
           rootState.auth.user.role === 'programmer'
  },

  isProgrammer(rootState) {
    return rootState.auth.user &&
           rootState.auth.user.role &&
           rootState.auth.user.role === 'programmer'
  }
}
