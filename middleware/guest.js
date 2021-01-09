export default function ({ store: { state }, redirect }) {
  const localUser = JSON.parse(localStorage.getItem('user'))

  if (state.user || localUser) {
    redirect('/')
  }
}
