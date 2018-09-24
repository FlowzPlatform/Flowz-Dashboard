// import api from '../api'
import axios from 'axios'
import config from '@/config'
export default {
	setUser ({ commit }, authToken) {
		// console.log("setUser called")
		commit('SET_USER', authToken)
	},
	authenticate ({ commit }, authToken) {
		return axios({
			method: 'post',
			url: config.userDetailsAPI + 'validatetoken',
			headers: {
				'authorization': authToken
			}
		})
			.then(response => {
				// console.log("response...",response)
				if (response) {
					return response.data.data
				} else {

				}
			})
	}
}
