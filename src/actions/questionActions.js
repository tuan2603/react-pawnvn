import * as types from '../constants/ActionTypes';
import {questionApi} from '../helpers';
import {show_notification} from './notifyActions';

export function loadQuestion() {
    return function (dispatch) {
        return questionApi.getAll().then(questions => {
            if (questions.response === true) {
                dispatch(loadQuestionsSuccess(questions.value));
            }
        }).catch(error => {
            throw(error);
        });
    };
}

export function loadQuestionsSuccess(question) {
    return {type: types.LOAD_Q_SUCCESS, question};
}

export function updateQuestion(question) {
    return function (dispatch) {
        return questionApi.update(question).then(question => {
            if (question.response === true) {
                dispatch(updateAdvSuccess(question.value));
                dispatch(show_notification({txt: "update thành công", type: "suc"}));
                return question.value;
            } else {
                dispatch(show_notification({txt: question.value, type: "err"}));
                return null;
            }
        }).catch(error => {
            throw(error);
        });
    };
}


export function updateAdvSuccess(question) {
    return {type: types.UPDATE_Q_SUCCESS, question}
}


export function createQuestion(question) {
    return function (dispatch) {
        return questionApi.create(question).then(question => {
            if (question.response === true) {
                dispatch(createQuestionSuccess(question.value));
                dispatch(show_notification({txt: "insert thành công", type: "suc"}));
                return question.value;
            } else {
                dispatch(show_notification({txt: question.value, type: "err"}));
                return null;
            }
        }).catch(error => {
            throw(error);
        });
    };
}

export function createQuestionSuccess(question) {
    return {type: types.CREATE_Q_SUCCESS, question}
}

export function deleteQuestion(question) {
    return function (dispatch) {
        return questionApi.delete(question).then(resQuestion => {
            if (resQuestion.response === true) {
                dispatch(deleteQuestionSuccess(resQuestion.value));
                dispatch(show_notification({txt: "delete thành công", type: "suc"}));
                return true;
            } else {
                dispatch(show_notification({txt: resQuestion.value, type: "err"}));
                return false;
            }
        }).catch(error => {
            throw(error);
        });
    }
}

export function deleteQuestionSuccess(question) {
    return {type: types.DELETE_Q_SUCCESS, question};
}
