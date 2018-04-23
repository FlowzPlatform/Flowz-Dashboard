import api from '../../api'
let model = 'user-subscription'
export default {
  get: (userId) => {
    return api.request('get', '/' + model + '/' + userId)
  },
  getOwn: () => {
    return api.request('get', '/' + model + '?$paginate=false')
  }
//   getThis: (id) => {
//     return api.request('get', '/' + model + '/' + id)
//   },
//   post: (data) => {
//     return api.request('post', '/' + model, data)
//   },
//   put: (id, data) => {
//     return api.request('put', '/' + model + '/' + id, data)
//   },
//   patch: (id, data) => {
//     return api.request('patch', '/' + model + '/' + id, data)
//   },
//   delete: () => {
//     return api.request('delete', '/' + model)
//   },
//   deleteThis: (id) => {
//     return api.request('delete', '/' + model + '/' + id)
//   }
}
