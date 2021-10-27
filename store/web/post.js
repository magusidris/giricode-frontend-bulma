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

  comment: {
    slug: '',
    comment: '',
    parentId: 0
  },

  canComment: false,

  canReply: false,

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
      let url = this.$applyParamsToUrl(`/api/v1/web/posts`, filter)

      return this.$axios.$get(url)
      .then(response => {
        const posts = response.data
        commit('setPostsData', {resource: 'all', posts})
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
  getDetailPost({ commit, state }, slug) {

    //get to Rest API "/api/web/posts/:slug" with method "GET"
    return this.$axios.$get(`/api/v1/web/posts/${slug}`)

    //success
    .then(response => {
        const post = response.data
        //commit to mutation "SET_POST_DATA"
        commit('setPostData', post)
        return state.post
    })
    .catch(error => Promise.reject(error))

  },

  storeVisitor({ dispatch }, slug) {

    // set Promise
    return new Promise((resolve, reject) => {

      // store to Rest API "/api/v1/admin/posts" with method "POST"
      this.$axios.post(`/api/v1/web/visitor/${slug}`)

      // success
      .then(() => {

        // dispatch getDetailPost
        // dispatch('getDetailPost')

        // resolve promise
        resolve()

      })

      .catch(error => reject(error))
    })
  },

  storeComment({ commit, dispatch, state }) {

    const slug = state.comment.slug
    const comment = state.comment.comment

    // set Promise
    return new Promise((resolve, reject) => {

      // store to Rest API "/api/v1/admin/posts" with method "POST"
      this.$axios.post(`/api/v1/web/post/${slug}/comment`, {'comment': comment})

      // success
      .then(() => {

        // dispatch getDetailPost
        dispatch('getDetailPost', slug)
        commit('setCanComment', false)
        commit('setCanReply', false)
        // resolve promise
        resolve()

      })

      .catch(error => reject(error))
    })
  },

  storeReply({ commit, dispatch, state }) {

    const slug = state.comment.slug
    const comment = state.comment.comment
    const parentId = state.comment.parentId

    // set Promise
    return new Promise((resolve, reject) => {

      // store to Rest API "/api/v1/admin/posts" with method "POST"
      this.$axios.post(`/api/v1/web/post/${slug}/reply/${parentId}`, {'comment': comment})

      // success
      .then(() => {

        // dispatch getDetailPost
        dispatch('getDetailPost', slug)
        commit('setCanComment', false)
        commit('setCanReply', false)
        // resolve promise
        resolve()

      })

      .catch(error => reject(error))
    })
  },

  updateComment({ commit }, {comment}) {
    commit('setCommentValue', {comment})
    commit('setCanComment', true)
    commit('setCanReply', false)
  },

  updateReply({ commit }, {comment, parentId}) {
    commit('setReplyValue', {comment})
    commit('setParentId', {parentId})
    commit('setCanReply', true)
    commit('setCanComment', false)
  },

  updateSlug({ commit }, {slug}) {
    commit('setSlugValue', {slug})
    commit('setCanComment', false)
    commit('setCanReply', false)
  }
}


//mutations
export const mutations = {
  setPostsData(state, {resource, posts}) {
    state.posts[resource] = posts
  },
  setPostData(state, post) {
    state.post = post
  },
  setPage(state, currentPage) {
    Vue.set(state.pagination, 'page', currentPage)
  },
  setCommentValue(state, {comment}) {
    state.comment.comment = comment
  },
  setReplyValue(state, {comment}) {
    state.comment.comment = comment
  },
  setParentId(state, {parentId}) {
    state.comment.parentId = parentId
  },
  setSlugValue(state, {slug}) {
    state.comment.slug = slug
  },
  setCanComment(state, canComment) {
    state.canComment = canComment
  },
  setCanReply(state, canReply) {
    state.canReply = canReply
  }
}
