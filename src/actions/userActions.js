import * as types from '../constants/ActionTypes';
import { getInfo, 
    login, 
    verifyHelper, 
    smsHelper, 
    avatarHelper,
    imageUserHelper,
    UserDocumentHelper} from "../helpers";
import { show_notification } from "./notifyActions";
import { getFromSession, removeSession, setInSession } from "../utils";
import { TOKEN } from "../constants/Users";

export function loadUser() {
    return function (dispatch) {
        if (getFromSession(TOKEN) !== null) {
            return getInfo().then(user => {
                if (user.response === true) {
                    dispatch(alogin(user.value));
                }
            }).catch(error => {
                throw (error);
            });
        }
    }
}

export function Login(obj) {
    return function (dispatch) {
        return login(obj).then(user => {
            if (user.value === 0) {
                setInSession(TOKEN, user.message);
                dispatch(loadUser());
                dispatch(show_notification({ txt: "Đăng nhập thành công", type: "suc" }));
                return user.value;
            } else if (user.value === 1) {
                dispatch(alogin({ phone: obj.phone }));
                dispatch(show_notification({ txt: user.message, type: "war" }));
                return user.value;
            } else {
                dispatch(show_notification({ txt: user.message, type: "err" }));
                return user.value;
            }
        }).catch(error => {
            throw (error);
        });
    };
}

export function Verify(code, phone) {
    return function (dispatch) {
        return verifyHelper(code, phone)
            .then(user => {
                if (user.value === 0) {
                    setInSession(TOKEN, user.message);
                    dispatch(loadUser());
                    dispatch(show_notification({ txt: "xác thực thành công", type: "suc" }));
                    return true
                } else {
                    dispatch(show_notification({ txt: user.message[user.value], type: "err" }));
                    return false;
                }
            }).catch(error => {
                throw (error);
            });
    };
}

export function UploadeAvata(data) {
    return function (dispatch) {
        return avatarHelper(data).then(user => {
            if (user.response === true) {
                dispatch(show_notification({ txt: "Upload thành công", type: "suc" }));
                dispatch(alogin(user.value));
                return true;
            } else {
                dispatch(show_notification({ txt: user.value, type: "err" }));
                return false;
            }
        }).catch(error => {
            throw (error);
        });
    };
}

export function UploadImage(data) {
    return function (dispatch) {
        return imageUserHelper(data).then(user => {
            if (user.response === true) {
                dispatch(show_notification({ txt: "Upload thành công", type: "suc" }));
                dispatch(alogin(user.value));
                return true;
            } else {
                dispatch(show_notification({ txt: user.value, type: "err" }));
                return false;
            }
        }).catch(error => {
            throw (error);
        });
    };
}

export function UploadDocument(data) {
    return function (dispatch) {
        return UserDocumentHelper(data).then(user => {
            if (user.response === true) {
                dispatch(show_notification({ txt: "Upload thành công", type: "suc" }));
                dispatch(alogin(user.value));
                return true;
            } else {
                dispatch(show_notification({ txt: user.value, type: "err" }));
                return false;
            }
        }).catch(error => {
            throw (error);
        });
    };
}

export function SendSMS(phone) {
    return function (dispatch) {
        return smsHelper(phone)
            .then(user => {
                if (user.value === 7) {
                    dispatch(show_notification({ txt: "Gửi yêu cầu thành công,  vui lòng xác nhận bằng mã tin nhắn điện thoại", type: "suc" }));
                } else {
                    setTimeout(() => {
                        dispatch(show_notification({ txt: "Không nhận được tin nhắn vui lòng liện hệ PawnVN", type: "err" }));
                    }, 1000)
                }
            }).catch(error => {
                throw (error);
            });
    };
}

export function alogin(username) {
    return {
        type: types.LOG_IN,
        username
    };
}

export function alogout() {

    removeSession(TOKEN);
    return {
        type: types.LOG_OUT,
    };

}
