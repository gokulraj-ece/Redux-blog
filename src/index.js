import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes'; //mapping between url and components
import promise from 'redux-promise';
// Router decides what to show on the screen
// browserHistory - an object that tells react router how to interpret
// changes to the url (not the History library) (eg) [posts/5]
// http://www.blog.com/posts/5
// alternative - hashHistory - anything after a hash (eg) [#posts/5]
// http://www.blog.com/#posts/5
// alternative - memoryHistory - doesnt use url for reading the history

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('.container'));
