import * as types from '../constants/ActionTypes';
import {getTemsHelper} from '../helpers';

export function loadTerm() {
    return function(dispatch) {
        return getTemsHelper({title:"terms"}).then(term => {
            if (term.response === true) {
                dispatch(loadTermSuccess(term.value));
            }
        }).catch(error => {
            throw(error);
        });
    };
}

export function loadTermSuccess(terms) {
    return {type: types.LOAD_TERM_SUCCESS, terms};
}
