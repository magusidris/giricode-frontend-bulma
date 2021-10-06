// state
export const state = () => ({

  // tags
  tags: [],

  // colors
  colors: [],

  // page
  page: 1,

  // tag
  tag: {}

})

// mutations
export const mutations = {
  // mutation "SetTagsData"
  setTagsData(state, payload) {

    // set value state "Tags"
    state.tags = payload
  },

  // mutation "SetTagsData"
  setColorsData(state, payload) {

    // set value state "Tags"
    state.colors = payload
  },

  // mutation "setPage"
  setPage(state, payload) {

    // set value state "page"
    state.page = payload
  },

  // mutation "setTagData"
  setTagData(state, payload) {

    // set value state "tag"
    state.tag = payload
  }
}

// actions
export const actions = {

  // get tags data
  getTagsData({ commit, state }, payload) {

    // search
    let search = payload ? payload : ''

    // set promise
    return new Promise((resolve, reject) => {

      // fetching Rest API "/api/v1/admin/tags" with method "GET"
      this.$axios.get(`/api/v1/admin/tags?q=${search}&page=${state.page}`)

      // success
      .then((response) => {

        // commit to mutation "SetTagsData"
        commit('setTagsData', response.data.data)

        // resolve promise
        resolve()
      })
    })
  },

  // get tags data
  getColorsData({ commit, state }, payload) {

    // search
    let search = payload ? payload : ''

    // set promise
    return new Promise((resolve, reject) => {

      // fetching Rest API "/api/v1/admin/tags" with method "GET"
      this.$axios.get(`/api/v1/admin/colors?q=${search}`)

      // success
      .then((response) => {

        // commit to mutation "SetTagsData"
        commit('setColorsData', response.data.data)

        // resolve promise
        resolve()
      })
    })
  },

  // store tag
  storeTag({ dispatch, commit }, payload) {

    // set Promise
    return new Promise((resolve, reject) => {

      // store to Rest API "/api/v1/admin/tags" with method "POST"
      this.$axios.post('/api/v1/admin/tags', payload)

      // success
      .then(() => {

        // dispatch action "getTagsData"
        dispatch('getTagsData')

        // resolve promise
        resolve()

      })

      .catch(error => reject(error))
    })
  },

  // get detail tag
  getDetailTag({ commit }, payload) {

    // set promise
    return new Promise((resolve) => {

      // get to Rest API "/api/v1/admin/tags/:id" with method "GET"
      this.$axios.get(`/api/v1/admin/tags/${payload}`)

      // success
      .then(response => {

        // commit to mutation "setTagData"
        commit('setTagData', response.data.data)

        // resolve promise
        resolve()
      })
    })
  },

  // update tag
  updateTag({ dispatch, commit }, { tagId, payload }) {

    // set promise
    return new Promise((resolve, reject) => {

      // store to Rest API "/api/v1/admin/tags/:id" with method POST
      this.$axios.post(`/api/v1/admin/tags/${tagId}`, payload)

      // success
      .then(() => {

        // dispatch action "getTagsData"
        dispatch('getTagsData')

        // resolve promise
        resolve()

      })

      // error
      .catch(error => reject(error))
    })
  },

  // destroy tags
  destroyTag({ dispatch, commit }, payload) {

    // set promise
    return new Promise((resolve, reject) => {

      // delete to Rest API "/api/v1/admin/tags/:id" with method "DELETE"
      this.$axios.delete(`/api/v1/admin/tags/${payload}`)

      // success
      .then(() => {

        // dispatch action "getTagsData"
        dispatch('getTagsData')

        // resolve promise
        resolve()

      })
    })
  }
}
