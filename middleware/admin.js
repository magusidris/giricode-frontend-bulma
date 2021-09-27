export default function({ store, redirect }) {
  const isAdmin = store.getters['isAdmin']

  if (!isAdmin) {
    // navigated later to notAuthorized page
    return redirect('/notAuthorized')
  }
}
