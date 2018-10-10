import * as config from '../utils';
import {authHeader} from '../helpers';
import {authHeaderJSon} from "./index";

class testimonialApi {
    static requestHeaders() {
        return authHeader;
    }

    static getAllTestimonial() {
        const requestOptions = {
            method: 'GET',
            headers: authHeader(),
        };
        return fetch(`${config.apiUrl}/api/testimonial/active`,requestOptions)
            .then((response) => response.json())
            .then((responseJson) => responseJson);
    }

    static update(body) {
        const requestOptions = {
            method: 'POST',
            headers: authHeaderJSon(),
            body: JSON.stringify(body),
        };

        return fetch(`${config.apiUrl}/api/testimonial/update`, requestOptions)
            .then((response) => response.json())
            .then((responseJson) => responseJson);
    }

    static updateImage(body) {
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: body,
        };

        return fetch(`${config.apiUrl}/api/testimonial/update/image`, requestOptions)
            .then((response) => response.json())
            .then((responseJson) => responseJson);
    }


    static create(body) {
        const requestOptions = {
            method: 'POST',
            headers: authHeader(),
            body: body,
        };

        return fetch(`${config.apiUrl}/api/testimonial`, requestOptions)
            .then((response) => response.json())
            .then((responseJson) => responseJson);
    }

    static delete(body) {
        const requestOptions = {
            method: 'POST',
            headers: authHeaderJSon(),
            body: JSON.stringify(body),
        };

        return fetch(`${config.apiUrl}/api/testimonial/delete`, requestOptions)
            .then((response) => response.json())
            .then((responseJson) => responseJson);
    }

}

export default testimonialApi;
