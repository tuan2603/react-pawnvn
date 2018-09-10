import * as types from '../constants/ActionTypes';
import {advertiseApi} from '../helpers';
import {show_notification} from './notifyActions';

export function loadAdvertise() {
    return function (dispatch) {
        return advertiseApi.getAll().then(advs => {
            if (advs.response === true) {
                dispatch(loadAdvertisesSuccess(advs.value));
            }
        }).catch(error => {
            throw(error);
        });
    };
}

export function loadAdvertisesSuccess(adver) {
    return {type: types.LOAD_ADV_SUCCESS, adver};
}

export function updateAdvertise(adver) {
    return function (dispatch) {
        return advertiseApi.update(adver).then(Adv => {
            if (Adv.response === true) {
                dispatch(updateAdvSuccess(Adv.value));
                dispatch(show_notification({txt: "update thành công", type: "suc"}));
                return Adv.value;
            } else {
                dispatch(show_notification({txt: Adv.value, type: "err"}));
                return null;
            }
        }).catch(error => {
            throw(error);
        });
    };
}

export function updateImageAdvertise(adverimage) {
    return function (dispatch) {
        return advertiseApi.updateImage(adverimage).then(adver => {
            if (adver.response === true) {
                dispatch(updateAdvSuccess(adver.value));
                dispatch(show_notification({txt: "update thành công", type: "suc"}));
                return adver.value;
            } else {
                dispatch(show_notification({txt: adver.value, type: "err"}));
                return null;
            }
        }).catch(error => {
            throw(error);
        });
    };
}

export function updateAdvSuccess(adver) {
    return {type: types.UPDATE_ADV_SUCCESS, adver}
}


export function createAdver(adver) {
    return function (dispatch) {
        return advertiseApi.create(adver).then(repadver => {
            if (repadver.response === true) {
                dispatch(createAdvSuccess(repadver.value));
                dispatch(show_notification({txt: "insert thành công", type: "suc"}));
                return repadver.value;
            } else {
                dispatch(show_notification({txt: repadver.value, type: "err"}));
                return null;
            }
        }).catch(error => {
            throw(error);
        });
    };
}

export function createAdvSuccess(adver) {
    return {type: types.CREATE_ADV_SUCCESS, adver}
}

export function deleteAdvertise(adver) {
    return function (dispatch) {
        return advertiseApi.delete(adver).then(resAdver => {
            console.log("delete",resAdver);
            if (resAdver.response === true) {
                dispatch(deleteAdvSuccess(resAdver.value));
                dispatch(show_notification({txt: "delete thành công", type: "suc"}));
                return true;
            } else {
                dispatch(show_notification({txt: resAdver.value, type: "err"}));
                return false;
            }
        }).catch(error => {
            throw(error);
        });
    }
}

export function deleteAdvSuccess(adver) {
    return {type: types.DELETE_ADV_SUCCESS, adver};
}
