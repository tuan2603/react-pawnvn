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
