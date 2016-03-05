import React from 'react';
import * as RB from 'react-bootstrap';
class Message extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.actionGo = this.actionGo.bind(this);
  }

  actionGo() {
    this.context.router.push(this.props.path);
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
          <p><RB.Button bsStyle="primary" onClick={this.actionGo}>{this.props.button}</RB.Button></p>
        </RB.Jumbotron>
      </div>
    );
  }
}

export default Message;
