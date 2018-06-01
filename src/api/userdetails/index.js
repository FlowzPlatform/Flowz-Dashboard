import axios from 'axios';
import config from '../../config';
let model = 'userdetails';

export default {
    get: () => {
        let url = config.userDetailsAPI + model;
        let method = 'get'
        return axios({method, url});
    }
}