import React from 'react';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { SHOW_MODAL } from './actions/index.js';
import Request from './Request.jsx';
import Content from './components/Content.jsx';
import Home from './components/pages/Home.jsx';
import NotFound from './components/pages/NotFound.jsx';
import ListItem from './components/pages/item/List.jsx';
import DetailItem from './components/pages/item/Detail.jsx';
import CreateItem from './components/pages/item/Create.jsx';
import UpdateItem from './components/pages/item/Update.jsx';
import SignOn from './components/pages/user/SignOn.jsx';
import SignIn from './components/pages/user/SignIn.jsx';
import Logout from './components/pages/user/Logout.jsx';
import SuccessSignOn from './components/pages/user/SuccessSignOn.jsx';
import ActivateUser from './components/pages/user/ActivateUser.jsx';
import createStore from './stores/index.js';
import reducer from './reducers/index.js';
import { Router, Route } from 'react-router';

class App extends React.Component {
  static propsTypes = {
    history: React.PropTypes.object,
    config: React.PropTypes.object,
    initialState: React.PropTypes.object
  };
  static childContextTypes = {
    config: React.PropTypes.object
  };
  constructor(props) {
    super(props);
    this.store = createStore(reducer, this.props.initialState);
    this.syncHistory= syncHistoryWithStore(this.props.history, this.store);
  }
  getChildContext() {
    return {
      config: this.props.config
    }
  }
  render() {
    return (
      <Provider store={this.store}>
        <Request baseUrl={this.props.config.serverApiUrl} >
          <Router history={this.syncHistory}>
            <Route component={Content}>
              <Route path='/' component={Home}/>
              <Route path='/list-item' component={ListItem}/>
              <Route path='/detail-item/:id' component={DetailItem}/>
              <Route path='/update-item/:id' component={UpdateItem}/>
              <Route path='/create-item' component={CreateItem}/>
              <Route path='/sign-on' component={SignOn}/>
              <Route path='/sign-in' component={SignIn}/>
              <Route path='/logout' component={Logout}/>
              <Route path='/success-sign-on' component={SuccessSignOn}/>
              <Route path='/activate-user/:token' component={ActivateUser}/>
              <Route path='*' component={NotFound}/>
            </Route>
          </Router>
        </Request>
      </Provider>
    );
  }
}
export default App;

