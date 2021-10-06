// state
export const state = () => ({

  // users
  users: [],

  // page
  page: 1,

  // user
  user: {}

})

// mutations
export const mutations = {
  // mutation "setUsersData"
  setUsersData(state, payload) {

    // set value state "users"
    state.users = payload
  },

  // mutation "setPage"
  setPage(state, payload) {

    // set value state "page"
    state.page = payload
  },

  // mutation "setUserData"
  setUserData(state, payload) {

    // set value state "user"
    state.user = payload
  }
}

// actions
export const actions = {

  // get Users data
  getUsersData({ commit, state }, payload) {

    // search
    let search = payload ? payload : ''

    // set promise
    return new Promise((resolve, reject) => {

      // fetching Rest API "/api/v1/admin/users" with method "GET"
      this.$axios.get(`/api/v1/admin/users?q=${search}&page=${state.page}`)

      // success
      .then((response) => {

        // commit to mutation "SetUsersData"
        commit('setUsersData', response.data.data)

        // resolve promise
        resolve()
      })
    })
  },

  // store User
  storeUser({ dispatch, commit }, payload) {

    // set Promise
    return new Promise((resolve, reject) => {

      // store to Rest API "/api/v1/admin/users" with method "POST"
      this.$axios.post('/api/v1/admin/users', payload)

      // success
      .then(() => {

        // dispatch action "getUsersData"
        dispatch('getUsersData')

        // resolve promise
        resolve()

      })

      .catch(error => reject(error))
    })
  },

  // get detail User
  getDetailUser({ commit }, payload) {

    // set promise
    return new Promise((resolve) => {

      // get to Rest API "/api/v1/admin/users/:id" with method "GET"
      this.$axios.get(`/api/v1/admin/users/${payload}`)

      // success
      .then(response => {

        // commit to mutation "setUserData"
        commit('setUserData', response.data.data)

        // resolve promise
        resolve()
      })
    })
  },

  // update User
  updateUser({ dispatch, commit }, { userId, payload }) {

    // set promise
    return new Promise((resolve, reject) => {

      // store to Rest API "/api/v1/admin/users/:id" with method POST
      this.$axios.post(`/api/v1/admin/users/${userId}`, payload)

      // success
      .then(() => {

        // dispatch action "getUsersData"
        dispatch('getUsersData')

        // resolve promise
        resolve()

      })

      // error
      .catch(error => reject(error))
    })
  },

  // destroy Users
  destroyUser({ dispatch, commit }, payload) {

    // set promise
    return new Promise((resolve, reject) => {

      // delete to Rest API "/api/v1/admin/users/:id" with method "DELETE"
      this.$axios.delete(`/api/v1/admin/users/${payload}`)

      // success
      .then(() => {

        // dispatch action "getUsersData"
        dispatch('getUsersData')

        // resolve promise
        resolve()

      })
    })
  }
}
