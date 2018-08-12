import {LOAD_CATS_SUCCESS, UPDATE_CAT_SUCCESS, CREATE_CAT_SUCCESS, DELETE_CAT_SUCCESS} from '../constants/ActionTypes';
// import {history} from "../helpers";

export default function catReducer(state = null, action) {
    switch (action.type) {
        case LOAD_CATS_SUCCESS:
            return action.cats;
        case CREATE_CAT_SUCCESS:
            return [
                ...state.filter(cat => cat._id !== action.cat._id),
                Object.assign({}, action.cat)
            ];
        case UPDATE_CAT_SUCCESS:
            return [
                ...state.filter(cat => cat._id !== action.cat._id),
                Object.assign({}, action.cat)
            ];
        case DELETE_CAT_SUCCESS: {
            const newState = Object.assign([], state);
            const indexOfCatToDelete = state.findIndex(cat => {
                return cat._id === action.cat._id
            })
            newState.splice(indexOfCatToDelete, 1);
            //history.push('/page-categories.html');
            return newState;
        }
        default:
            return state;
    }
}
