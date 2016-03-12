import React from 'react';
import * as RB from 'react-bootstrap';
class Message extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="row">
        <RB.Jumbotron>
          <h1>{this.props.title}</h1>
          <p>
            {this.props.message}
            your account has been successfully created
          </p>
          <p><Link to={this.props.path}>{this.props.button}</Link></p>
        </RB.Jumbotron>
      </div>
    );
  }
}

export default Message;
