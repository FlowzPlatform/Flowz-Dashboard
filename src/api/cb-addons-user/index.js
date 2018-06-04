import api from '../../api'
let model = 'cb-addons-user'

export default {
	get: (id) => {
		return api.request('get', '/' + model + '?addon_id=' + id + '&paginate=false')
	}
}
