import * as types from '../constants/ActionTypes';
import {getTemsHelper} from '../helpers';

export function loadAbout() {
    return function(dispatch) {
        return getTemsHelper({title:"introduce"}).then(about => {
            if (about.response === true) {
                dispatch(loadAboutSuccess(about.value));
            }
        }).catch(error => {
            throw(error);
        });
    };
}

export function loadAboutSuccess(about) {
    return {type: types.LOAD_ABOUT_SUCCESS, about};
}
