export const state = () => ({ isLoading: false, user: null })

export const mutations = {
  setLoading(state, value) {
    state.isLoading = value
  },
  setUser(state, user) {
    state.user = user
    localStorage.setItem(
      'sessionTime',
      user === null ? 0 : new Date().getTime() + 3600 * 1000
    )
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('isAlreadyRegister', true)
  },
}

export const actions = {
  logOut({ commit }) {
    commit('setUser', null)
  },
}
