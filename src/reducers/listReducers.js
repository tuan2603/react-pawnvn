import {ADD_ITEM , REMOVE_ITEM} from '../constants/ActionTypes';
let defaultState = ['Android', 'IOS', 'NodeJS'];

export default function listReduces(state = defaultState, action) {
    switch (action.type) {
        case ADD_ITEM:
            return [...state, action.item];
        case REMOVE_ITEM:
            return state.filter((e,i) => i !== action.index );
        default:
            return state;
    }
}
