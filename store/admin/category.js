// state
export const state = () => ({

  // categories
  categories: [],

  // page
  page: 1,

  // category
  category: {}

})

// mutations
export const mutations = {
  // mutation "setCategoriesData"
  setCategoriesData(state, payload) {

    // set value state "Categories"
    state.categories = payload
  },

  // mutation "setPage"
  setPage(state, payload) {

    // set value state "page"
    state.page = payload
  },

  // mutation "setCategoryData"
  setCategoryData(state, payload) {

    // set value state "category"
    state.category = payload
  }
}

// actions
export const actions = {

  // get categories data
  getCategoriesData({ commit, state }, payload) {

    // search
    let search = payload ? payload : ''

    // set promise
    return new Promise((resolve, reject) => {

      // fetching Rest API "/api/v1/admin/categories" with method "GET"
      this.$axios.get(`/api/v1/admin/categories?q=${search}&page=${state.page}`)

      // success
      .then((response) => {

        // commit to mutation "SetCategoriesData"
        commit('setCategoriesData', response.data.data)

        // resolve promise
        resolve()
      })
    })
  },

  // store category
  storeCategory({ dispatch, commit }, payload) {

    // set Promise
    return new Promise((resolve, reject) => {

      // store to Rest API "/api/v1/admin/categories" with method "POST"
      this.$axios.post('/api/v1/admin/categories', payload)

      // success
      .then(() => {

        // dispatch action "getCategoriesData"
        dispatch('getCategoriesData')

        // resolve promise
        resolve()

      })

      .catch(error => reject(error))
    })
  },

  // get detail Category
  getDetailCategory({ commit }, payload) {

    // set promise
    return new Promise((resolve) => {

      // get to Rest API "/api/v1/admin/categories/:id" with method "GET"
      this.$axios.get(`/api/v1/admin/categories/${payload}`)

      // success
      .then(response => {

        // commit to mutation "setCategoryData"
        commit('setCategoryData', response.data.data)

        // resolve promise
        resolve()
      })
    })
  },

  // update Category
  updateCategory({ dispatch, commit }, { categoryId, payload }) {

    // set promise
    return new Promise((resolve, reject) => {

      // store to Rest API "/api/v1/admin/categories/:id" with method POST
      this.$axios.post(`/api/v1/admin/categories/${categoryId}`, payload)

      // success
      .then(() => {

        // dispatch action "getCategoriesData"
        dispatch('getCategoriesData')

        // resolve promise
        resolve()

      })

      // error
      .catch(error => reject(error))
    })
  },

  // destroy categories
  destroyCategory({ dispatch, commit }, payload) {

    // set promise
    return new Promise((resolve, reject) => {

      // delete to Rest API "/api/v1/admin/categories/:id" with method "DELETE"
      this.$axios.delete(`/api/v1/admin/categories/${payload}`)

      // success
      .then(() => {

        // dispatch action "getCategoriesData"
        dispatch('getCategoriesData')

        // resolve promise
        resolve()

      })
    })
  }
}
