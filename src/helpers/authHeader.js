import {getFromSession} from '../utils'
import {TOKEN} from '../constants/Users'
export function authHeader() {
    // return authorization header with jwt token
    let token = getFromSession(TOKEN);
    if (token) {
        return { 'Authorization': 'Bearer ' + token };
    } else {
        return {};
    }
}
export function authHeaderJSon() {
    // return authorization header with jwt token
    let token = getFromSession(TOKEN);
    if (token) {
        return { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' };
    } else {
        return {};
    }
}
