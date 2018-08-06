import {LOAD_TERM_SUCCESS} from '../constants/ActionTypes';

export default function termReducer(state = null, action) {
    switch (action.type) {
        case LOAD_TERM_SUCCESS:
            return action.terms;
        default:
            return state;
    }
}
