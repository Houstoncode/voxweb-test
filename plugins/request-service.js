export default ({ $axios, store: { dispatch }, redirect }, inject) => {
  const requestService = $axios.create({
    baseURL: '/api',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  requestService.getByLink = (url) => {
    return $axios.get(url)
  }

  requestService.interceptors.response.use(
    (response) => response,
    (error) => {
      if ([401].includes(error.response.status)) {
        throw error.response.data
      }

      if ([404].includes(error.response.status)) {
        throw error
      }

      if ([419, 504].includes(error.response.status)) {
        dispatch('logOut')
        redirect('/auth')

        const error = {
          success: false,
          message: 'Произошла ошибка, попробуйте позже!',
        }

        throw error
      }

      throw error
    }
  )

  inject('requestService', requestService)
}
