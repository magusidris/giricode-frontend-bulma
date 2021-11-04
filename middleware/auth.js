export default function({ store, redirect }) {
  const isAuth = store.getters['isAuthenticated']

  //check loggedIn "true"
  if(!isAuth) {

      return redirect('/notAuthenticated')
  }

}
