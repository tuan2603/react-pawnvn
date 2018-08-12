import { combineReducers } from 'redux';
import userReducers from './userReducers';
import notifyReducers from './notifyReducers';
import termReducer from './termReducer';
import aboutReducer from './aboutReducer';
import cats from './catReducers';
const rootReducer = combineReducers({
    userReducers,
    notifyReducers,
    termReducer,
    aboutReducer,
    cats,
});

export default rootReducer;
