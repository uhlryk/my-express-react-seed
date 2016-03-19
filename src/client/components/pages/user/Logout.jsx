import React from 'react';
import { REMOVE_USER } from '../../../actions/index';
import MessagePage from '../../helpers/MessagePage.jsx';
import { connect } from 'react-redux';

@connect(state => ({
  user: state.user
}))
class SignIn extends React.Component {

  static contextTypes = {
    request: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
    showNotification: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state= {
      details: {}
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: REMOVE_USER
    });
  }

  renderMessage() {
    return (
      <MessagePage
        title="Success"
        body="your account has been successfully created"
        label="home"
        path="/"
      />
    );
  }

  render() {
    if(!this.props.user) {
      return this.renderMessage();
    }
    return false;
  }
}

export default SignIn;
