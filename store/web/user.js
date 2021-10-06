export const state = () => ({
  user: null
})

export const actions = {
  register(_, registerData) {
    return this.$axios.$post('/api/v1/guest/register', registerData)
    .catch(error => Promise.reject(error))
  }
}
