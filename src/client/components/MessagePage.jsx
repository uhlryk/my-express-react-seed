import React from 'react';
import * as RB from 'react-bootstrap';
import { Link } from 'react-router';
class Message extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  static propsTypes = {
    title: React.PropTypes.string,
    body: React.PropTypes.string,
    onClick: React.PropTypes.func,
    label: React.PropTypes.string,
    path: React.PropTypes.string
  };
  constructor(props) {
    super(props);
  }


  render() {
    let button = null;
    if(this.props.path) {
      button = <p><Link to={this.props.path} onClick={this.props.onClick} >{this.props.label}</Link></p>;
    }
    return (
      <div className="row">
        <RB.Jumbotron>
          <h1>{this.props.title}</h1>
          <p>
            {this.props.body}
          </p>
          {button}
        </RB.Jumbotron>
      </div>
    );
  }
}

export default Message;
