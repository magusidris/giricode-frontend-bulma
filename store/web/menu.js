//state
export const state = () => ({

  //menus
  menus: [],

})

//mutations
export const mutations = {

  //mutation "SET_MENUS_DATA"
  SET_MENUS_DATA(state, payload) {

      //set value state "menus"
      state.menus = payload
  }

}

//actions
export const actions = {

  //get categories data
  getMenusData({ commit }) {

      //set promise
      return new Promise((resolve, reject) => {

          //fetching Rest API "/api/v1/web/menus" with method "GET"
          this.$axios.get('/api/v1/web/menus')

          //success
          .then((response) => {

              //commit ti mutation "SET_CATEGORIES_DATA"
              commit('SET_MENUS_DATA', response.data.data)

              //resolve promise
              resolve()
          })

      })

  }

}
