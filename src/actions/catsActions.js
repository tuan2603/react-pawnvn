import * as types from '../constants/ActionTypes';
import {getAllCats} from '../helpers';


export function loadCats() {
    return function (dispatch) {
        return getAllCats().then(cats => {
            if (cats.response === true) {
                dispatch(loadCatsSuccess(cats.value));
            }
        }).catch(error => {
            throw(error);
        });
    };
}

export function loadCatsSuccess(cats) {
    return {type: types.LOAD_CATS_SUCCESS, cats};
}

