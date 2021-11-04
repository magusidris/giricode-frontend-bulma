export const state = () => ({

  /* NavBar */
  isNavBarVisible: true,

  /* FooterBar */
  isFooterBarVisible: true,

  /* Aside */
  isAsideVisible: true,
  isAsideMobileExpanded: false,
})

export const mutations = {

  /* Aside Mobile */
  asideMobileStateToggle(state, payload = null) {
    const htmlClassName = 'has-aside-mobile-expanded'

    let isShow

    if (payload !== null) {
      isShow = payload
    } else {
      isShow = !state.isAsideMobileExpanded
    }

    if (isShow) {
      document.documentElement.classList.add(htmlClassName)
    } else {
      document.documentElement.classList.remove(htmlClassName)
    }

    state.isAsideMobileExpanded = isShow
  },
}


export const actions = {
  async nuxtServerInit({commit, dispatch}) {
  }
}


export const getters = {
  authUser(rootState) {
    return rootState.auth.user &&
           rootState.auth.user.user
  },

  isAuthenticated(rootState) {
    return !!rootState.auth.loggedIn
  },

  isOperator(rootState) {
    return rootState.auth.user &&
           rootState.auth.user.user.role &&
           rootState.auth.user.user.role === 'operator'
  },

  isAdmin(rootState) {
    return rootState.auth.user &&
           rootState.auth.user.user.role &&
           rootState.auth.user.user.role === 'admin'
  },

  isProgrammer(rootState) {
    return rootState.auth.user &&
           rootState.auth.user.user.role &&
           rootState.auth.user.user.role === 'programmer'
  }
}
