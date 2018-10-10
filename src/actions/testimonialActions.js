import * as types from '../constants/ActionTypes';
import {testimonialApi} from '../helpers';
import {show_notification} from './notifyActions';


export function loadTestimonial() {
    return function (dispatch) {
        return testimonialApi.getAllTestimonial().then(
            testimonial => {
            if (testimonial.response === true) {
                dispatch(loadTestimonialSuccess(testimonial.value));
            }
        }).catch(error => {
            throw(error);
        });
    };
}

export function loadTestimonialSuccess(testimonial) {
    return {type: types.LOAD_TESTIMONIAL_SUCCESS, testimonial};
}

export function updateTestimonial(obj) {
    return function (dispatch) {
        return testimonialApi.update(obj).then(testimonial => {
            if (testimonial.response === true) {
                dispatch(UpdateTestimonialSuccess(testimonial.value));
                dispatch(show_notification({txt: "update thành công", type: "suc"}));
                return testimonial.value;
            } else {
                dispatch(show_notification({txt: testimonial.value, type: "err"}));
                return null;
            }
        }).catch(error => {
            throw(error);
        });
    };
}

export function updateImageTestimonial(obj) {
    return function (dispatch) {
        return testimonialApi.updateImage(obj).then(testimonial => {
            if (testimonial.response === true) {
                dispatch(UpdateTestimonialSuccess(testimonial.value));
                dispatch(show_notification({txt: "update thành công", type: "suc"}));
                return testimonial.value;
            } else {
                dispatch(show_notification({txt: testimonial.value, type: "err"}));
                return null;
            }
        }).catch(error => {
            throw(error);
        });
    };
}


export function UpdateTestimonialSuccess(testimonial) {
    return {type: types.UPDATE_TESTIMONIAL_SUCCESS, testimonial}
}


export function createTestimonial(obj) {
    return function (dispatch) {
        return testimonialApi.create(obj).then(testimonial => {
            if (testimonial.response === true) {
                dispatch(createTestimonialSuccess(testimonial.value));
                dispatch(show_notification({txt: "insert thành công", type: "suc"}));
                return testimonial.value;
            } else {
                dispatch(show_notification({txt: testimonial.value, type: "err"}));
                return null;
            }
        }).catch(error => {
            throw(error);
        });
    };
}

export function createTestimonialSuccess(testimonial) {
    return {type: types.CREATE_TESTIMONIAL_SUCCESS, testimonial}
}

export function deleteTestimonial(obj) {
    return function (dispatch) {
        return testimonialApi.delete(obj).then(testimonial => {
            if (testimonial.response === true) {
                dispatch(deleteTestimonialSuccess(testimonial.value));
                dispatch(show_notification({txt: "delete thành công", type: "suc"}));
                return testimonial.value;
            } else {
                dispatch(show_notification({txt: testimonial.value, type: "err"}));
                return null;
            }
        }).catch(error => {
            throw(error);
        });
    }
}

export function deleteTestimonialSuccess(testimonial) {
    return {type: types.DELETE_TESTIMONIAL_SUCCESS, testimonial};
}
