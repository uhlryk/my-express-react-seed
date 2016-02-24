import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import style from './sass/style.scss';
import Request from 'react-context-ajax';
import createStore from './stores/index.js';
import reducer from './reducers/index.js';
import App from './components/App.jsx';
import Home from './components/pages/Home.jsx';
import NotFound from './components/pages/NotFound.jsx';
import ListItem from './components/pages/item/List.jsx';
import CreateItem from './components/pages/item/Create.jsx';
import { Router, Route, browserHistory } from 'react-router';

var requestOptions = {
  baseUrl: 'http://localhost:3000/api'
}

var store = createStore(reducer);
render(
  <Provider store={store}>
    <Request options={requestOptions} >
      <Router history={browserHistory}>
        <Route component={App}>
          <Route path="/" component={Home}/>
          <Route path="/list-item" component={ListItem}/>
          <Route path="/create-item" component={CreateItem}/>
          <Route path="*" component={NotFound}/>
        </Route>
      </Router>
    </Request>
  </Provider>,
  document.getElementById('root')
);
