//state
export const state = () => ({

  //tags
  tags: [],

  //tag
  tag: {}
})

//mutations
export const mutations = {

  //mutation "SET_TAGS_DATA"
  SET_TAGS_DATA(state, payload) {

      //set value state "tags"
      state.tags = payload
  },

  //mutation "SET_TAG_DATA"
  SET_TAG_DATA(state, payload) {

    //set value state "tag"
    state.tag = payload
  },

}

//actions
export const actions = {

  //get tags data
  getTagsData({ commit }) {

      //set promise
      return new Promise((resolve, reject) => {

          //fetching Rest API "/api/web/tags" with method "GET"
          this.$axios.get('/api/v1/web/tags')

          //success
          .then((response) => {

              //commit ti mutation "SET_TAGS_DATA"
              commit('SET_TAGS_DATA', response.data.data)

              //resolve promise
              resolve()
          })

      })

  },

  //get detail tag
  getDetailTag({ commit }, payload) {

    //set promise
    return new Promise((resolve, reject) => {

        //get to Rest API "/api/web/tags/:slug" with method "GET"
        this.$axios.get(`/api/v1/web/tags/${payload}`)

        //success
        .then(response => {

            //commit to mutation "SET_TAG_DATA"
            commit('SET_TAG_DATA', response.data.data)

            //resolve promise
            resolve()

        })

    })

  },

}
