const build = ({ $requestService }) => {
  const routes = {
    saveUserSettings: '/user/settings',
    userProfile: '/user/profile',
    userLogin: '/auth/login',
    userRegister: '/auth/register',
  }

  const api = {
    routes,
    requestService: $requestService,

    auth: {
      login({ login, password }) {
        return $requestService.post(routes.userLogin, { login, password })
      },
      register(data) {
        return $requestService.post(routes.userRegister, { ...data })
      },
    },
    user: {
      saveSettings(settings) {
        return $requestService.post(routes.saveUserSettings, { ...settings })
      },
      profile() {
        return $requestService.get(routes.userProfile)
      },
    },
  }

  return api
}

export default { build }
