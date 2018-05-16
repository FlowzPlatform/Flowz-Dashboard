import api from '../../api';
let model = 'cb-plan';

export default {
    get: (id) => {
        if (id != undefined) {
            return api.request('get', '/' + model + '/' + id);
        } else {
            return api.request('get', '/' + model);
        }
    },
    post: (data) => {
        return api.request('post', '/' + model, data);
    },
    put: (id, data) => {
        return api.request('put', '/' + model, data);
    },
    delete: (id) => {
        return api.request('delete', '/' + model, id)
    }
}