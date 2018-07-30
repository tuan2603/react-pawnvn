import { combineReducers } from 'redux';
import userReducers from './userReducers';
import notifyReducers from './notifyReducers';

const rootReducer = combineReducers({
    userReducers,
    notifyReducers,
});

export default rootReducer;
