import React from 'react';
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
import { Router, Route, browserHistory } from 'react-router';

var requestOptions = {
  baseUrl: 'http://localhost:3000/api'
}

var store = createStore(reducer);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Request options={requestOptions}>
          <Router history={browserHistory}>
            <Route component={Content}>
              <Route path="/" component={Home}/>
              <Route path="/list-item" component={ListItem}/>
              <Route path="/detail-item/:id" component={DetailItem}/>
              <Route path="/update-item/:id" component={UpdateItem}/>
              <Route path="/create-item" component={CreateItem}/>
              <Route path="*" component={NotFound}/>
            </Route>
          </Router>
        </Request>
      </Provider>
    )
  }
}
export default App;
