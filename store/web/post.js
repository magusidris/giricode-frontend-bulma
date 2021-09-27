import Vue from 'vue'

//state
export const state = () => ({

  //posts
  posts: {
    all: []
  },

  //post
  post: {},

  //page
  page: 1,

  pagination: {
    page: 1 // Current page
  }
})

//actions
export const actions = {

  //get posts data
  getPostsData({ commit, state }, filter) {

      //search
      // let search = payload ? payload : ''
      const url = this.$applyParamsToUrl('/api/v1/web/posts', filter)

      return this.$axios.$get(url)
      .then(response => {
        const blogs = response.data
        commit('setPostsData', {resource: 'all', blogs})
        return state.posts.all
      })
      .catch(error => Promise.reject(error))
      //set promise
      // return new Promise((resolve, reject) => {
      //   debugger

      //     //fetching Rest API "/api/web/posts" with method "GET"
      //     // this.$axios.get(`/api/v1/web/posts?q=${search}&page=${filter}`)
      //     this.$axios.get(url)

      //     //success
      //     .then((response) => {
      //       const blogs = response.data.data

      //         //commit ti mutation "SET_POSTS_DATA"
      //         commit('setPostsData', blogs)

      //         //resolve promise
      //         resolve()
      //     })

      // })

  },

  //get detail post
  getDetailPost({ commit }, payload) {

    //set promise
    return new Promise((resolve, reject) => {

        //get to Rest API "/api/web/posts/:slug" with method "GET"
        this.$axios.get(`/api/v1/web/posts/${payload}`)

        //success
        .then(response => {

            //commit to mutation "SET_POST_DATA"
            commit('setPostData', response.data.data)

            //resolve promise
            resolve()

        })

    })

  },
}


//mutations
export const mutations = {
  setPostsData(state, {resource, blogs}) {
    state.posts[resource] = blogs
  },
  setPage(state, currentPage) {
    Vue.set(state.pagination, 'page', currentPage)
  }
}
