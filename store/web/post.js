//state
export const state = () => ({

  //posts
  posts: [],

  //post
  post: {},

  visitor: {},

  //page
  page: 1,

  comment: {
    slug: '',
    comment: '',
    parentId: 0
  },

  canComment: false,
  canReply: false
})

//actions
export const actions = {

  // get categories data
  getPostsData({ commit, state }, payload) {

    // search
    let search = payload ? payload : ''

    // set promise
    return new Promise((resolve, reject) => {

      // fetching Rest API "/api/v1/web/posts" with method "GET"
      this.$axios.get(`/api/v1/web/posts?q=${search}&page=${state.page}`)

      // success
      .then((response) => {

        // commit to mutation "SetCategoriesData"
        commit('setPostsData', response.data.data)

        // resolve promise
        resolve()
      })
      .catch(error => reject(error))
    })
  },

  //get detail post
  getDetailPost({ commit }, payload) {

    //set promise
    return new Promise((resolve, reject) => {

      //get to Rest API "/api/web/posts/:slug" with method "GET"
      this.$axios.$get(`/api/v1/web/posts/${payload}`)

      //success
      .then(response => {

          //commit to mutation "SET_POST_DATA"
          commit('setPostData', response.data)

          resolve()
      })
      .catch(error => reject(error))
    })

  },

  storeVisitor({ commit }, payload) {

    // set Promise
    return new Promise((resolve, reject) => {

      // store to Rest API "/api/v1/admin/posts" with method "POST"
      this.$axios.post(`/api/v1/web/visitor/${payload}`)

      // success
      .then(response => {

        // dispatch getDetailPost
        commit('setVisitorData', response.data)

        // resolve promise
        resolve()

      })

      .catch(error => {
        reject(error)
      })
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
    // commit('setCanReply', false)
  },

  updateReply({commit}, {comment, parentId}) {
    commit('setReplyValue', {comment})
    commit('setParentId', {parentId})
    // commit('setCanComment', false)
    commit('setCanReply', true)
  },

  updateSlug({commit}, {slug}) {
    commit('setSlugValue', {slug})
  }
}


//mutations
export const mutations = {
  setPostsData(state, payload) {
    state.posts = payload
  },
  setPostData(state, payload) {
    state.post = payload
  },

  setVisitorData(state, payload) {
    state.visitor = payload
  },

  // mutation "setPage"
  setPage(state, payload) {

    // set value state "page"
    state.page = payload
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
