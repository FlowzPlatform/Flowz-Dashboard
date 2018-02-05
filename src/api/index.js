import axios from 'axios'
import config from '../config'

export default {
  request (method, uri, data = null, headers = null) {
    if (!method) {
      console.error('API function call requires method argument')
      return
    }

    if (!uri) {
      console.error('API function call requires uri argument')
      return
    }

    var url = config.serverURI + uri
    // console.log('Fired url : ', method, url, JSON.stringify(data), JSON.stringify(headers))
    return axios({ method, url, data , headers})
  }
}
