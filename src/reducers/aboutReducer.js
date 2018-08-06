import {LOAD_ABOUT_SUCCESS} from '../constants/ActionTypes';

export default function aboutReducer(state = null, action) {
    switch (action.type) {
        case LOAD_ABOUT_SUCCESS:
            return action.about;
        default:
            return state;
    }
}
