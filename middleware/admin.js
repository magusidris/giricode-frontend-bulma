export default function({ store, redirect }) {
  const isAdmin = store.getters['isAdmin']
  const isProgrammer = store.getters['isProgrammer']

  if (!isProgrammer && !isAdmin) {
    // navigated later to notAuthorized page
    return redirect('/notAuthorized')
  }
}
