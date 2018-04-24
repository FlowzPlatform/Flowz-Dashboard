import api from '../../api'
let model = 'user-addon'

export default {
    get: (id) => {
        return api.request('get', '/' + model + '?$paginate=false&basicPlan=' + id)
    }
}