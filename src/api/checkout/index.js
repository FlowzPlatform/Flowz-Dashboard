import api from '../../api'
let model = 'checkout'

export default {
    get: () => {
        return api.request('get', '/' + model)
    },
    post: (data) => {
        return api.request('post', '/' + model, data)
    }
}