import api from '../../api'
let model = 'cb-customer'

export default {
	get: (id) => {
		if (id != undefined) {
			return api.request('get', '/' + model + '/' + id)
		} else {
			return api.request('get', '/' + model)
		}
	},
	post: (data) => {
		return api.request('post', '/' + model, data)
	},
	patch: (id, data) => {
		return api.request('patch', '/' + model + '/' + id, data)
	}
	/* put: (id, data) => {
        return api.request('put', '/' + model + '/' + id, data);
    },
    delete: (id) => {
        return api.request('delete', '/' + model + '/' + id);
    } */
}
