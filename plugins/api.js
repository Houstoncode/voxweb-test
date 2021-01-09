import Api from '@/services/api'

export default ({ app: { $requestService } }, inject) => {
  inject('api', Api.build({ $requestService }))
}
