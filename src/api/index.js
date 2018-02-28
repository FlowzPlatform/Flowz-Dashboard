import axios from 'axios'
import config from '../config'
var VueCookie = require('vue-cookie')

export default {
  request (method, uri, data = null, headers) {
    if (!method) {
      console.error('API function call requires method argument')
      return
    }

    if (!uri) {
      console.error('API function call requires uri argument')
      return
    }

    let nHeaders = {}
    if(headers != undefined){
      nHeaders = Object.assign(headers, {'Authorization': VueCookie.get('auth_token')})
    }
    else{
      nHeaders = {'Authorization': VueCookie.get('auth_token')}
    }

    var url = config.serverURI + uri
    // console.log('Fired url : ', method, url, 'headers',nHeaders, JSON.stringify(nHeaders))
    return axios({ method, url, data, nHeaders })
  }
}
