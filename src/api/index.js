import axios from 'axios'
import config from './config'
import Qs from 'Qs'
/**
 * [checkCode deal with data.code]
 * @param  {[object]} response
 * @return {[object]} response
 */
function checkStatus(response) {
    return response.data;
    if (response.status == 200) {
        return response.data;
    } else {
        return false;
    }
}

export default {
    /**
     * [config some public options about ajax]
     * @type {[object]}
     */
    config: config,
    /**
     * [get]
     * @param  {[string]} url
     * @param  {[object]} params [get params]
     * @return {[promise object]} axios [a promise object]
     */
    get(url, params) {

        return axios({
            method: 'get',
            url: config.api + url,
            params: params,
            timeout: config.timeout,
            headers: config.headers,
        }).then(checkStatus);
    },
    /**
     * [post]
     * @param  {[string]} url
     * @param  {[object]} params [post body]
     * @return {[promise object]} axios [a promise object]
     */
    post(url, data) {
        data = Qs.stringify(data)
        return axios({
            method: 'post',
            url: config.api + url,
            data: data,
            timeout: config.timeout,
            headers: config.headers,
        }).then(checkStatus);
    },
    /**
     * [put]
     * @param  {[string]} url
     * @param  {[object]} params [post body]
     * @return {[promise object]} axios [a promise object]
     */
    put(url, data) {
        data = Qs.stringify(data)
        return axios({
            method: 'put',
            url: config.api + url,
            data: data,
            timeout: config.timeout,
            headers: config.headers,
        }).then(checkStatus);
    },
    /**
     * [delete]
     * @param  {[string]} url
     * @param  {[object]} params [post body]
     * @return {[promise object]} axios [a promise object]
     */
    delete(url, data) {
        data = Qs.stringify(data)
        return axios({
            method: 'delete',
            url: config.api + url,
            data: data,
            timeout: config.timeout,
            headers: config.headers,
        }).then(checkStatus);
    },
    login(data) {
        data = Qs.stringify(data)
        return axios({
            method: 'post',
            url: config.api + config.getToken,
            data: data,
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(checkStatus)
    },
}
