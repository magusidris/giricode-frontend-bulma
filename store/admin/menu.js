// state
export const state = () => ({

  // menus
  menus: [],

  // page
  page: 1,

  // menu
  menu: {}

})

// mutations
export const mutations = {
  // mutation "setMenusData"
  setMenusData(state, payload) {

    // set value state "menus"
    state.menus = payload
  },

  // mutation "setPage"
  setPage(state, payload) {

    // set value state "page"
    state.page = payload
  },

  // mutation "setMenuData"
  setMenuData(state, payload) {

    // set value state "menu"
    state.menu = payload
  }
}

// actions
export const actions = {

  // get Menus data
  getMenusData({ commit, state }, payload) {

    // search
    let search = payload ? payload : ''

    // set promise
    return new Promise((resolve, reject) => {

      // fetching Rest API "/api/v1/admin/menus" with method "GET"
      this.$axios.get(`/api/v1/admin/menus?q=${search}&page=${state.page}`)

      // success
      .then((response) => {

        // commit to mutation "SetMenusData"
        commit('setMenusData', response.data.data)

        // resolve promise
        resolve()
      })
    })
  },

  // store Menu
  storeMenu({ dispatch, commit }, payload) {

    // set Promise
    return new Promise((resolve, reject) => {

      // store to Rest API "/api/v1/admin/menus" with method "POST"
      this.$axios.post('/api/v1/admin/menus', payload)

      // success
      .then(() => {

        // dispatch action "getMenusData"
        dispatch('getMenusData')

        // resolve promise
        resolve()

      })

      .catch(error => reject(error))
    })
  },

  // get detail Post
  getDetailMenu({ commit }, payload) {

    // set promise
    return new Promise((resolve) => {

      // get to Rest API "/api/v1/admin/menus/:id" with method "GET"
      this.$axios.get(`/api/v1/admin/menus/${payload}`)

      // success
      .then(response => {

        // commit to mutation "setMenuData"
        commit('setMenuData', response.data.data)

        // resolve promise
        resolve()
      })
    })
  },

  // update Menu
  updateMenu({ dispatch, commit }, { menuId, payload }) {

    // set promise
    return new Promise((resolve, reject) => {

      // store to Rest API "/api/v1/admin/menus/:id" with method POST
      this.$axios.post(`/api/v1/admin/menus/${menuId}`, payload)

      // success
      .then(() => {

        // dispatch action "getMenusData"
        dispatch('getMenusData')

        // resolve promise
        resolve()

      })

      // error
      .catch(error => reject(error))
    })
  },

  // destroy Menu
  destroyMenu({ dispatch, commit }, payload) {

    // set promise
    return new Promise((resolve, reject) => {

      // delete to Rest API "/api/v1/admin/menus/:id" with method "DELETE"
      this.$axios.delete(`/api/v1/admin/menus/${payload}`)

      // success
      .then(() => {

        // dispatch action "getMenusData"
        dispatch('getMenusData')

        // resolve promise
        resolve()

      })
    })
  }
}
