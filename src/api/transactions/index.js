import api from '../../api'
let model = 'transactions'

export default {
    get: (id) => {
        return api.request('get', '/' + model + '/' + id)
    }
}