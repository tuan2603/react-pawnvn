import {LOAD_Q_SUCCESS, UPDATE_Q_SUCCESS, CREATE_Q_SUCCESS, DELETE_Q_SUCCESS} from '../constants/ActionTypes';
// import {history} from "../helpers";

export default function questionReducer(state = null, action) {
    switch (action.type) {
        case LOAD_Q_SUCCESS:
            return action.question;
        case CREATE_Q_SUCCESS:
            if (state === null) {
                return [ Object.assign({}, action.question)]
            }
            return [...state.filter(question => question._id !== action.question._id),
                Object.assign({}, action.question)
            ];
        case UPDATE_Q_SUCCESS:
            return [...state.filter(question => question._id !== action.question._id),
                Object.assign({}, action.question)
            ];
        case DELETE_Q_SUCCESS: {
            const newState = Object.assign([], state);
            const indexOfCatToDelete = state.findIndex(question => {
                return question._id === action.question._id
            });
            newState.splice(indexOfCatToDelete, 1);
            return newState;
        }
        default:
            return state;
    }
}
