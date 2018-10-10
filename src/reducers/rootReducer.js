import { combineReducers } from 'redux';
import userReducers from './userReducers';
import notifyReducers from './notifyReducers';
import termReducer from './termReducer';
import aboutReducer from './aboutReducer';
import cats from './catReducers';
import advers from './advertiseReducers';
import questions from './questionReducers';
import testimonials from './testimonialReducers';

const rootReducer = combineReducers({
    userReducers,
    notifyReducers,
    termReducer,
    aboutReducer,
    cats,
    advers,
    questions,
    testimonials,
});

export default rootReducer;
