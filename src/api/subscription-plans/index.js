import api from '../../api'
let model = 'subscription-plans'

export default {
    get: () => {
        return api.request('get', '/' + model)
    },
    post: (data) => {
        return api.request('post', '/' + model + '/', data)
    },
    put: (id, data) => {
        return api.request('put', '/' + model + '/' + id, data)
    },
    delete: (id) => {
        return api.request('delete', '/' + model + '/' + id)
    }
}