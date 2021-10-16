// state
export const state = () => ({

  // posts
  posts: [],

  // categories
  categories: [],

  // tags
  tags: [],

  // page
  page: 1,

  // post
  post: {}

})

export const getters = {
  getCategories(state) {
    return state.categories
  },
  getTags(state) {
    return state.tags
  }
}

// mutations
export const mutations = {
  // mutation "setPostsData"
  setPostsData(state, payload) {

    // set value state "posts"
    state.posts = payload
  },

  // mutation "setCategoriesData"
  setCategoriesData(state, payload) {

    // set value state "posts"
    state.categories = payload
  },

  // mutation "setTagsData"
  setTagsData(state, payload) {

    // set value state "tags"
    state.tags = payload
  },

  // mutation "setPage"
  setPage(state, payload) {

    // set value state "page"
    state.page = payload
  },

  // mutation "setPostData"
  setPostData(state, payload) {

    // set value state "post"
    state.post = payload
  }
}

// actions
export const actions = {

  // get Posts data
  getPostsData({ commit, state }, payload) {

    // search
    let search = payload ? payload : ''

    // set promise
    return new Promise((resolve, reject) => {

      // fetching Rest API "/api/v1/admin/posts" with method "GET"
      this.$axios.get(`/api/v1/admin/posts?q=${search}&page=${state.page}`)

      // success
      .then((response) => {

        // commit to mutation "SetPostsData"
        commit('setPostsData', response.data.data)

        // resolve promise
        resolve()
      })
    })
  },

  // get Posts data
  getCategoriesData({ commit, state }, payload) {

    // search
    let search = payload ? payload : ''

    // set promise
    return new Promise((resolve, reject) => {

      // fetching Rest API "/api/v1/admin/categories" with method "GET"
      this.$axios.get(`/api/v1/admin/post/categories?q=${search}&page=${state.page}`)

      // success
      .then((response) => {

        // commit to mutation "SetPostsData"
        commit('setCategoriesData', response.data.data)

        // resolve promise
        resolve()
      })
    })
  },


  // get Tags data
  getTagsData({ commit, state }, payload) {

    // search
    let search = payload ? payload : ''

    // set promise
    return new Promise((resolve, reject) => {

      // fetching Rest API "/api/v1/admin/alltags" with method "GET"
      this.$axios.get(`/api/v1/admin/post/tags?q=${search}&page=${state.page}`)

      // success
      .then((response) => {

        // commit to mutation "SetPostsData"
        commit('setTagsData', response.data.data)

        // resolve promise
        resolve()
      })
    })
  },

  // get detail Post
  getDetailPost({ commit }, payload) {

    // set promise
    return new Promise((resolve) => {

      // get to Rest API "/api/v1/admin/posts/:id" with method "GET"
      this.$axios.get(`/api/v1/admin/posts/${payload}`)

      // success
      .then(response => {

        // commit to mutation "setPostData"
        commit('setPostData', response.data.data)

        // resolve promise
        resolve()
      })
    })
  },

  // store post
  storePost({ dispatch, commit }, payload) {

    // set Promise
    return new Promise((resolve, reject) => {

      // store to Rest API "/api/v1/admin/posts" with method "POST"
      this.$axios.post('/api/v1/admin/posts', payload)

      // success
      .then(() => {

        // dispatch action "getPostsData"
        dispatch('getPostsData')

        // resolve promise
        resolve()

      })

      .catch(error => reject(error))
    })
  },

  // get detail Post
  getDetailPost({ commit }, payload) {

    // set promise
    return new Promise((resolve) => {

      // get to Rest API "/api/v1/admin/posts/:id" with method "GET"
      this.$axios.get(`/api/v1/admin/posts/${payload}`)

      // success
      .then(response => {

        // commit to mutation "setPostData"
        commit('setPostData', response.data.data)

        // resolve promise
        resolve()
      })
    })
  },

  // update Post
  updatePost({ dispatch, commit }, { postId, payload }) {

    // set promise
    return new Promise((resolve, reject) => {

      // store to Rest API "/api/v1/admin/posts/:id" with method POST
      this.$axios.post(`/api/v1/admin/posts/${postId}`, payload)

      // success
      .then(() => {

        // dispatch action "getPostsData"
        dispatch('getPostsData')

        // resolve promise
        resolve()

      })

      // error
      .catch(error => reject(error))
    })
  },

  // destroy Post
  destroyPost({ dispatch, commit }, payload) {

    // set promise
    return new Promise((resolve, reject) => {

      // delete to Rest API "/api/v1/admin/posts/:id" with method "DELETE"
      this.$axios.delete(`/api/v1/admin/posts/${payload}`)

      // success
      .then(() => {

        // dispatch action "getPostsData"
        dispatch('getPostsData')

        // resolve promise
        resolve()

      })
    })
  }
}
