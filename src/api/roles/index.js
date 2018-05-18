import api from '../../api';
let model = 'roles';

export default {
    get: () => {
        return api.request('get', '/' + model, null, { 'Content-Type': 'application/x-www-form-urlencoded;' });
    }
};