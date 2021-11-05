//actions
export const actions = {

  storeGuest({ dispatch }, payload) {

    // set Promise
    return new Promise((resolve, reject) => {

      // store to Rest API "/api/v1/admin/posts" with method "POST"
      this.$axios.post(`/api/v1/web/guestbook`, payload)

      // success
      .then(() => {

        // dispatch getDetailPost
        // dispatch('getDetailPost')

        // resolve promise
        resolve()

      })

      .catch(error => reject(error))
    })
  }

}
