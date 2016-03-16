import React from 'react';
import * as RB from 'react-bootstrap';
import { SET_USER } from '../../../actions/index';
import { connect } from 'react-redux';

@connect()
class SignIn extends React.Component {

  static contextTypes = {
    request: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
    showNotification: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state= {
      details: {}
    };
  }

  handleEmailChange(evt) {
    this.setState({
      details: Object.assign({}, this.state.details, { email: evt.target.value})
    });
  }

  handlePasswordChange(evt) {
    this.setState({
      details: Object.assign({}, this.state.details, { password: evt.target.value})
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.context.request.postRequest({
      url: '/authentications',
      body: {
        ...this.state.details
      }, endCallback: (err, req, res)=> {
        if(err && err.status === 422) {
          this.context.showNotification('Wrong credentials', 'error', 'error');
        } else if(err && err.status === 404) {
          this.context.showNotification('There is no active user with this email', 'error', 'error');
        } else if(err) {
          this.context.showNotification('There was unexpected error', 'error', 'error');
        } else {
          this.context.showNotification('You are logged in', 'success', 'success');
          this.props.dispatch({
            type: SET_USER,
            token: res.body.token,
            email: req.body.email
          });
          this.context.router.push('/');
        }
      }
    });
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <RB.Input
            type="email"
            value={this.state.details.email}
            placeholder="Enter email"
            label="Email"
            ref="emailInput"
            help="Validation is based on string length."
            groupClassName="group-class"
            labelClassName="label-class"
            onChange={this.handleEmailChange} />
          <RB.Input
            type="password"
            value={this.state.details.password}
            placeholder="Enter password"
            label="Password"
            ref="passwordInput"
            help="Validation is based on string length."
            groupClassName="group-class"
            labelClassName="label-class"
            onChange={this.handlePasswordChange} />
          <RB.ButtonInput type="submit" value="Submit Button" />
        </div>
      </form>
    );
  }

  render() {
    return this.renderForm();
  }
}

export default SignIn;
