export default async function ({ $api, store: { state, commit }, redirect }) {
  const localUser = JSON.parse(localStorage.getItem('user'))
  const sessionTime = localStorage.getItem('sessionTime')

  if (localUser && !state.user) {
    try {
      await $api.user.profile()
    } finally {
    }
  }

  if (new Date().getTime() > sessionTime) {
    redirect('/auth')
    return
  }

  if (localUser) {
    commit('setUser', localUser)
  }

  if (!state.user) {
    try {
      const {
        data: { user },
      } = await $api.user.profile()

      commit('setUser', user)
    } catch (error) {
      redirect('/auth')
    } finally {
    }
  }
}
