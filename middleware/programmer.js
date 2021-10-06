export default function({ store, redirect }) {
  const isProgrammer = store.getters['isProgrammer']

  if (!isProgrammer) {
    // navigated later to notAuthorized page
    return redirect('/notAuthorized')
  }
}
