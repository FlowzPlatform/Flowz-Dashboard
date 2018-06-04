import api from '../../api'
let model = 'cb-subscription'

export default {
	get: (id) => {
		if (id != undefined) {
			return api.request('get', '/' + model + '/' + id)
		} else {
			return api.request('get', '/' + model + '?limit=100')
		}
	},
	getOwn: (id) => {
		return api.request('get', '/' + model + '?limit=100&customer_id=' + id)
	},
	getSubscribed: (id) => {
		return api.request('get', '/' + model + '?limit=100&plan_id=' + id)
	},
	post: (data) => {
		return api.request('post', '/' + model, data)
	},
	put: (id, data) => {
		return api.request('put', '/' + model + '/' + id, data)
	},
	patch: (id, data) => {
		return api.request('patch', '/' + model + '/' + id, data)
	},
	delete: (id) => {
		return api.request('delete', '/' + model + '/' + id)
	}
}
