import React from 'react';
import MessagePage from '../../helpers/MessagePage.jsx';
import Loading from '../../helpers/Loading.jsx';
class ActivateUser extends React.Component {
  static contextTypes = {
    request: React.PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      activated: false,
      error: null,
      loading: true
    };
  }
  componentDidMount() {
    this.context.request.postRequest({
      url: '/users/activate',
      body: {
        token: this.props.params.token
      },
      endCallback: (err, req, res)=> {
        if(err) {
          this.setState({
            loading: false,
            error: err,
            activated: false
          });
        } else {
          this.setState({
            activated: true,
            loading: false
          });
        }
      }
    });
  }
  renderSuccess() {
    return (
      <MessagePage
        title="Success"
        body="your account has been successfully activated"
        label="login"
        path="/"
      />
    );
  }
  renderError() {
    return (
      <MessagePage
        title="Error"
        body="This account can't be activated"
        label="home"
        path="/"
      />
    );
  }
  renderLoading() {
    return (
      <Loading />
    );
  }

  render() {
    if(this.state.loading === true) {
      return this.renderLoading();
    } else if(this.state.activated) {
      return this.renderSuccess();
    } else {
      return this.renderError();
    }
  }
}

export default ActivateUser;
