import * as config from '../utils';
import {authHeader} from '../helpers';

export function login(phone, password) {
    const configheader = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({phone, password}),
    };

    return fetch(`${config.apiUrl}/api/auth/sign-in-admin`, configheader)
        .then((response) => response.json())
        .then((responseJson) => responseJson);

}


export function getInfo() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/auth/get-info`, requestOptions)
        .then((response) => response.json())
        .then((responseJson) => responseJson);
}

export function verifyCaptcha(token) {
    const configheader = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({token}),
    };
    return fetch(`${config.apiUrl}/api/captcha`, configheader)
        .then((response) => response.json())
        .then((responseJson) => responseJson);
}

