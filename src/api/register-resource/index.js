import api from '../../api'
let model = 'register-resource'

export default {
    get: () => {
        return api.request('get', '/' + model)
    }
}