export default function({ store, redirect }) {
  const isProgrammer = store.getters['isProgrammer']
  const isAdmin = store.getters['isAdmin']
  const isOperator = store.getters['isOperator']

  if (!isProgrammer && !isAdmin && !isOperator) {
    // navigated later to notAuthorized page
    return redirect('/notAuthorized')
  }
}
