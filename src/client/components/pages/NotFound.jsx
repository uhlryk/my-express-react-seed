import React from 'react';
import { connect } from 'react-redux';
import * as RB from 'react-bootstrap';
import * as Actions from '../../actions/index.js';
import MessagePage from '../helpers/MessagePage.jsx';

@connect(state => ({
}))
class NotFound extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MessagePage
        title='Error'
        path='/'
        label='home'
        body='Page not Found'
      />
    );
  }
}

export default NotFound;
