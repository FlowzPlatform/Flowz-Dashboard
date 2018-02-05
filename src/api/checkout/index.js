import api from '../../api'
let model = 'checkout'

export default {
    get: () => {
        return api.request('get', '/' + model)
    },
    post: (data, headers) => {
        return api.request('post', '/' + model, data, headers)
    }
}