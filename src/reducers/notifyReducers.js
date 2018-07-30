import { HIDE_NOTIFICATION , SHOW_NOTIFICATION} from '../constants/ActionTypes';

export default function notifyReduces(state = {}, action) {
    switch (action.type) {
        case SHOW_NOTIFICATION:
            return action.notification;
        case HIDE_NOTIFICATION:
            return null;
        default:
            return state;
    }
}
