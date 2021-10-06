export default function({ $auth, redirect }) {

  //check loggedIn "true"
  if(!$auth.loggedIn) {

      return redirect('/notAuthenticated')
  }

}
