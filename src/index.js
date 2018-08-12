import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './helpers';
import {App} from './containers';
import {loadTerm} from './actions/termActions';
import {loadAbout} from './actions/aboutActions';
import {loadUser} from './actions/userActions';
store.dispatch(loadTerm());
store.dispatch(loadAbout());
store.dispatch(loadUser());
store.subscribe(()=>console.log(store.getState()));
render((
        <Provider store={store}>
            <App/>
        </Provider>
    ),
    document.getElementById('root')
);

