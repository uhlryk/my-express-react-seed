import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import style from './sass/style.scss';
import createStore from './stores/index.js';
import reducer from './reducers/index.js';
import App from './components/App.jsx';
import Home from './components/pages/Home.jsx';
import NotFound from './components/pages/NotFound.jsx';
import { Router, Route, browserHistory } from 'react-router';

var store = createStore(reducer);
render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App}>
        <Route path="/" component={Home}/>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
