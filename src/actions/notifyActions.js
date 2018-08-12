import * as types from '../constants/ActionTypes';

export function Notification(notification) {
    return function (dispatch) {
        dispatch(show_notification(notification))
    }
}

export function show_notification(notification) {
    return {
        type: types.SHOW_NOTIFICATION,
        notification
    };
}

export function hide_notification() {
    return {
        type: types.HIDE_NOTIFICATION,
    };
}
