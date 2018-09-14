import * as config from '../utils';
import {authHeader} from '../helpers';
import {authHeaderJSon} from "./index";

class questionApi {
    static requestHeaders() {
        return authHeader;
    }

    static getAll() {
        return fetch(`${config.apiUrl}/api/question`)
            .then((response) => response.json())
            .then((responseJson) => responseJson);
    }

    static update(body) {
        const requestOptions = {
            method: 'POST',
            headers: authHeaderJSon(),
            body: JSON.stringify(body),
        };

        return fetch(`${config.apiUrl}/api/question/update`, requestOptions)
            .then((response) => response.json())
            .then((responseJson) => responseJson);
    }


    static create(body) {
        const requestOptions = {
            method: 'POST',
            headers: authHeaderJSon(),
            body: JSON.stringify(body),
        };

        return fetch(`${config.apiUrl}/api/question/insert`, requestOptions)
            .then((response) => response.json())
            .then((responseJson) => responseJson);
    }

    static delete(body) {
        const requestOptions = {
            method: 'POST',
            headers: authHeaderJSon(),
            body: JSON.stringify(body),
        };

        return fetch(`${config.apiUrl}/api/question/delete`, requestOptions)
            .then((response) => response.json())
            .then((responseJson) => responseJson);
    }

}

export default questionApi;
