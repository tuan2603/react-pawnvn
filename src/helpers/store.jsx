import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';

// Create store
export const store = createStore(rootReducer);
