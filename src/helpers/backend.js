import * as config from '../utils';
import {authHeader, authHeaderJSon} from '../helpers';

export function login(obj) {
    const configheader = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(obj),
    };

    return fetch(`${config.apiUrl}/api/auth/sign-in-pass-word`, configheader)
        .then((response) => response.json())
        .then((responseJson) => responseJson);

}

export function verifyHelper(code, phone) {
    const configheader = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({code, phone, 'verifyType': 1, 'roleType': 2}),
    };

    return fetch(`${config.apiUrl}/api/auth/verify`, configheader)
        .then((response) => response.json())
        .then((responseJson) => responseJson);

}

export function smsHelper(phone) {
    const configheader = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({phone}),
    };

    return fetch(`${config.apiUrl}/api/auth/sendsms`, configheader)
        .then((response) => response.json())
        .then((responseJson) => responseJson);

}

export function getTemsHelper(body) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
    };

    return fetch(`${config.apiUrl}/api/get-terms`, requestOptions)
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

export function getCity() {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${config.apiUrl}/api/city`, requestOptions)
        .then((response) => response.json())
        .then((responseJson) => responseJson);
}

export function avatarHelper(body) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: body
    };

    return fetch(`${config.apiUrl}/api/auth/avatar`, requestOptions)
        .then((response) => response.json())
        .then((responseJson) => responseJson);
}

export function imageUserHelper(body) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: body
    };

    return fetch(`${config.apiUrl}/api/auth/card`, requestOptions)
        .then((response) => response.json())
        .then((responseJson) => responseJson);
}

export function UserDocumentHelper(body) {
    const requestOptions = {
        method: 'POST',
        headers: authHeaderJSon(),
        body: JSON.stringify(body),
    };

    return fetch(`${config.apiUrl}/api/auth/doccumentboth`, requestOptions)
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

export function register(body) {
    const configheader = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
    };
    return fetch(`${config.apiUrl}/api/auth/register-web`, configheader)
        .then((response) => response.json())
        .then((responseJson) => responseJson);
}

export function getAllCats() {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${config.apiUrl}/api/category`, requestOptions)
        .then((response) => response.json())
        .then((responseJson) => responseJson);
}

export function get_total_amount_disbursed() {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${config.apiUrl}/api/contract/total_amount_disbursed`, requestOptions)
        .then((response) => response.json())
        .then((responseJson) => responseJson);
}

