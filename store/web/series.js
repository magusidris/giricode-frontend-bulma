// state
export const state = () => ({


  // series
  series: [],

  // posts
  posts: [],

  // page
  page: 1,


  // post
  postseri: {},

  // post
  post: {}

})

export const getters = {
  getPosts(state) {
    return state.posts
  }
}

// mutations
export const mutations = {
  // mutation "setPostsData"
  setSeriesData(state, payload) {

    // set value state "posts"
    state.series = payload
  },

  // mutation "setCategoriesData"
  setPostseriData(state, payload) {

    // set value state "posts"
    state.postseri = payload
  },

  // mutation "setCategoriesData"
  setPostsData(state, payload) {

    // set value state "posts"
    state.posts = payload
  },

  // mutation "setPage"
  setPage(state, payload) {

    // set value state "page"
    state.page = payload
  }

}

// actions
export const actions = {

  // get Posts data
  getSeriesData({ commit, state }, payload) {

    // search
    let search = payload ? payload : ''

    // set promise
    return new Promise((resolve, reject) => {

      // fetching Rest API "/api/v1/web/posts" with method "GET"
      this.$axios.get(`/api/v1/web/postseries?q=${search}&page=${state.page}`)

      // success
      .then((response) => {

        // commit to mutation "SetPostsData"
        commit('setSeriesData', response.data.data)

        // resolve promise
        resolve()
      })
    })
  },

  // get Posts data
  getPostsData({ commit, state }, payload) {

    // search
    let search = payload ? payload : ''

    // set promise
    return new Promise((resolve, reject) => {

      // fetching Rest API "/api/v1/web/posts" with method "GET"
      this.$axios.get(`/api/v1/web/postseri/posts?q=${search}&page=${state.page}`)

      // success
      .then((response) => {

        // commit to mutation "SetPostsData"
        commit('setPostsData', response.data.data)

        // resolve promise
        resolve()
      })
    })
  },

  // get detail Post
  getDetailSeries({ commit }, payload) {

    // set promise
    return new Promise((resolve) => {

      // get to Rest API "/api/v1/web/posts/:id" with method "GET"
      this.$axios.get(`/api/v1/web/postseries/${payload}`)

      // success
      .then(response => {

        // commit to mutation "setPostData"
        commit('setPostseriData', response.data)

        // resolve promise
        resolve()
      })
    })
  },

}
