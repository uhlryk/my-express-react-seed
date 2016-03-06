import React from 'react';
import * as RB from 'react-bootstrap';
class SignOn extends React.Component {

  static contextTypes = {
    request: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmChange = this.handleConfirmChange.bind(this);
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

  handleConfirmChange(evt) {
    this.setState({
      details: Object.assign({}, this.state.details, { confirm: evt.target.value})
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.context.request.postRequest({
      url: '/users',
      body: {
        ...this.state.details
      }, endCallback: (err, req, res)=> {
        this.context.router.push('/success-sign-on');
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
          <RB.Input
            type="password"
            value={this.state.details.confirm}
            placeholder="Repeat password"
            label="Confirm Password"
            ref="passwordInput"
            help="Validation is based on string length."
            groupClassName="group-class"
            labelClassName="label-class"
            onChange={this.handleConfirmChange} />
          <RB.ButtonInput type="submit" value="Submit Button" />
        </div>
      </form>
    );
  }

  render() {
    return this.renderForm();
  }
}

export default SignOn;
