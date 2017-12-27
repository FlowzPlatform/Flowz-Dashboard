// import api from '../api'
import _ from 'lodash'
import axios from 'axios'
import config from '@/config'
export default {
  setUser ({ commit }, authToken) {
    console.log("setUser called")
    commit('SET_USER', authToken)
  },
  authenticate ({ commit }, authToken) {
    console.log("++++++++++",config.microURI,authToken)
    return axios({
      method: 'get',
      url: config.microURI + '/userdetails',
      headers: {
        'authorization': authToken
      }
    })
    .then(response => {
      console.log("response...",response)
      if (response) {
        return response.data.data
      } else {
        return
      }
    })
  }
}
