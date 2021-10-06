// state
export const state = () => ({

  // sliders
  sliders: [],

  // page
  page: 1,

  // slider
  slider: {}

})

// mutations
export const mutations = {
  // mutation "setSlidersData"
  setSlidersData(state, payload) {

    // set value state "sliders"
    state.sliders = payload
  },

  // mutation "setPage"
  setPage(state, payload) {

    // set value state "page"
    state.page = payload
  },

  // mutation "setSliderData"
  setSliderData(state, payload) {

    // set value state "slider"
    state.slider = payload
  }
}

// actions
export const actions = {

  // get Sliders data
  getSlidersData({ commit, state }, payload) {

    // search
    let search = payload ? payload : ''

    // set promise
    return new Promise((resolve, reject) => {

      // fetching Rest API "/api/v1/admin/sliders" with method "GET"
      this.$axios.get(`/api/v1/admin/sliders?q=${search}&page=${state.page}`)

      // success
      .then((response) => {

        // commit to mutation "SetSlidersData"
        commit('setSlidersData', response.data.data)

        // resolve promise
        resolve()
      })
    })
  },

  // store Slider
  storeSlider({ dispatch, commit }, payload) {

    // set Promise
    return new Promise((resolve, reject) => {

      // store to Rest API "/api/v1/admin/sliders" with method "POST"
      this.$axios.post('/api/v1/admin/sliders', payload)

      // success
      .then(() => {

        // dispatch action "getSlidersData"
        dispatch('getSlidersData')

        // resolve promise
        resolve()

      })

      .catch(error => reject(error))
    })
  },

  // get detail Slider
  getDetailSlider({ commit }, payload) {

    // set promise
    return new Promise((resolve) => {

      // get to Rest API "/api/v1/admin/sliders/:id" with method "GET"
      this.$axios.get(`/api/v1/admin/sliders/${payload}`)

      // success
      .then(response => {

        // commit to mutation "setSliderData"
        commit('setSliderData', response.data.data)

        // resolve promise
        resolve()
      })
    })
  },

  // update Slider
  updateSlider({ dispatch, commit }, { sliderId, payload }) {

    // set promise
    return new Promise((resolve, reject) => {

      // store to Rest API "/api/v1/admin/sliders/:id" with method POST
      this.$axios.post(`/api/v1/admin/sliders/${sliderId}`, payload)

      // success
      .then(() => {

        // dispatch action "getSlidersData"
        dispatch('getSlidersData')

        // resolve promise
        resolve()

      })

      // error
      .catch(error => reject(error))
    })
  },

  // destroy Slider
  destroySlider({ dispatch, commit }, payload) {

    // set promise
    return new Promise((resolve, reject) => {

      // delete to Rest API "/api/v1/admin/sliders/:id" with method "DELETE"
      this.$axios.delete(`/api/v1/admin/sliders/${payload}`)

      // success
      .then(() => {

        // dispatch action "getSlidersData"
        dispatch('getSlidersData')

        // resolve promise
        resolve()

      })
    })
  }
}
