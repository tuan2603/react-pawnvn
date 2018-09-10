import {LOAD_ADV_SUCCESS, UPDATE_ADV_SUCCESS, CREATE_ADV_SUCCESS, DELETE_ADV_SUCCESS} from '../constants/ActionTypes';
// import {history} from "../helpers";

export default function advertiseReducer(state = null, action) {
    switch (action.type) {
        case LOAD_ADV_SUCCESS:
            return action.adver;
        case CREATE_ADV_SUCCESS:
            if (state === null) {
                return [ Object.assign({}, action.adver)]
            }
            return [...state.filter(adver => adver._id !== action.adver._id),
                Object.assign({}, action.adver)
            ];
        case UPDATE_ADV_SUCCESS:
            return [...state.filter(adver => adver._id !== action.adver._id),
                Object.assign({}, action.adver)
            ];
        case DELETE_ADV_SUCCESS: {
            const newState = Object.assign([], state);
            const indexOfCatToDelete = state.findIndex(adver => {
                return adver._id === action.adver._id
            })
            newState.splice(indexOfCatToDelete, 1);
            //history.push('/page-categories.html');
            return newState;
        }
        default:
            return state;
    }
}
