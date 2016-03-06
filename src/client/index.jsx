import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import style from './sass/style.scss';
import Request from 'react-context-ajax';
import createStore from './stores/index.js';
import reducer from './reducers/index.js';
import Content from './components/Content.jsx';
import Home from './components/pages/Home.jsx';
import NotFound from './components/pages/NotFound.jsx';
import ListItem from './components/pages/item/List.jsx';
import DetailItem from './components/pages/item/Detail.jsx';
import CreateItem from './components/pages/item/Create.jsx';
import UpdateItem from './components/pages/item/Update.jsx';
import SignOn from './components/pages/user/SignOn.jsx';
import SuccessSignOn from './components/pages/user/SuccessSignOn.jsx';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import NotificationSystem from 'react-notification-system';

const requestOptions = {
  baseUrl: 'http://localhost:3000/api',
  endCallback: (err, req, res, done) => {
    if(err) {

    } else {
      done(null, req, res);
    }
  }

}

const store = createStore(reducer);

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
  <Provider store={store}>
    <Request {...requestOptions}>
      <Router history={history}>
        <Route component={Content}>
          <Route path="/" component={Home}/>
          <Route path="/list-item" component={ListItem}/>
          <Route path="/detail-item/:id" component={DetailItem}/>
          <Route path="/update-item/:id" component={UpdateItem}/>
          <Route path="/create-item" component={CreateItem}/>
          <Route path="/sign-on" component={SignOn}/>
          <Route path="/success-sign-on" component={SuccessSignOn}/>
          <Route path="*" component={NotFound}/>
        </Route>
      </Router>
    </Request>
  </Provider>
), document.getElementById('root'));

