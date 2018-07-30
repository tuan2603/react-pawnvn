import * as types from '../constants/ActionTypes';

export function toggle() {
    return {
        type: types.TOGGLE_IS_ADDING,
    };
}

export function add_item(item) {
    return {
        type: types.ADD_ITEM,
        item
    };
}

export function remove_item(index) {
    return {
        type: types.REMOVE_ITEM,
        index
    };
}
