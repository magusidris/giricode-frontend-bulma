export default function({ $auth, redirect }) {

  //check loggedIn "true"
  if($auth.loggedIn) {

      //check role admin
      if($auth.user.role == "programmer") {

          return redirect('/')

      }
  }

}
