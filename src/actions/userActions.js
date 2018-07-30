import * as types from '../constants/ActionTypes';

export function alogin(username) {
    return {
        type: types.LOG_IN,
        username
    };
}

export function alogout() {
    return {
        type: types.LOG_OUT,
    };
}