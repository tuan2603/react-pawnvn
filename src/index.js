import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './helpers';
import {App} from './containers';
import {loadTerm} from './actions/termActions';
import {loadAbout} from './actions/aboutActions';
store.dispatch(loadTerm());
store.dispatch(loadAbout());
store.subscribe(()=>console.log(store.getState()));
render((
        <Provider store={store}>
            <App/>
        </Provider>
    ),
    document.getElementById('root')
);

