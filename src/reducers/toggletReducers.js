import {TOGGLE_IS_ADDING} from '../constants/ActionTypes';

let defaultState = false;

export default function listReduces(state = defaultState, action) {
    switch (action.type) {
        case TOGGLE_IS_ADDING:
            return !state;
        default:
            return state;
    }
}
