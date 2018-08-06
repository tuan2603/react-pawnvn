import { combineReducers } from 'redux';
import userReducers from './userReducers';
import notifyReducers from './notifyReducers';
import termReducer from './termReducer';
import aboutReducer from './aboutReducer';

const rootReducer = combineReducers({
    userReducers,
    notifyReducers,
    termReducer,
    aboutReducer,
});

export default rootReducer;
