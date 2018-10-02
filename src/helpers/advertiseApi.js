import * as config from '../utils';
import {authHeader} from '../helpers';
import {authHeaderJSon} from "./index";

class advertiseApi {
    static requestHeaders() {
        return authHeader;
    }

    static getAll() {
        return fetch(`${config.apiUrl}/api/advertise`)
            .then((response) => response.json())
            .then((responseJson) => responseJson);
    }

    static update(body) {
        const requestOptions = {
            method: 'POST',
            headers: authHeaderJSon(),
            body: JSON.stringify(body),
        };

        return fetch(`${config.apiUrl}/api/advertise/update`, requestOptions)
            .then((response) => response.json())
            .then((responseJson) => responseJson);
    }

    static updateImage(body) {
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: body,
        };

        return fetch(`${config.apiUrl}/api/advertise/updateimage`, requestOptions)
            .then((response) => response.json())
            .then((responseJson) => responseJson);
    }

    static create(body) {
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: body,
        };

        return fetch(`${config.apiUrl}/api/advertise/insert`, requestOptions)
            .then((response) => response.json())
            .then((responseJson) => responseJson);
    }

    static delete(body) {
        const requestOptions = {
            method: 'POST',
            headers: authHeaderJSon(),
            body: JSON.stringify(body),
        };

        return fetch(`${config.apiUrl}/api/advertise/delete`, requestOptions)
            .then((response) => response.json())
            .then((responseJson) => responseJson);
    }

}

export default advertiseApi;
