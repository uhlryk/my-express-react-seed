import React from 'react';
import * as RB from 'react-bootstrap';
import { connect } from 'react-redux';

@connect(state => ({
  modal: state.modal
}))
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
    let button1 = null;
    if(this.props.modal.button1) {
      button1 = (
        <RB.Button bsStyle="primary" onClick={this.actionGo}>{this.props.modal.button1}</RB.Button>
      );
    }
    return (
      <div className="static-modal">
        <RB.Modal.Dialog>
          <RB.Modal.Header>
            <RB.Modal.Title>{this.props.modal.title}</RB.Modal.Title>
          </RB.Modal.Header>

          <RB.Modal.Body>
            {this.props.modal.body}
          </RB.Modal.Body>

          <RB.Modal.Footer>
            {button1}
          </RB.Modal.Footer>

        </RB.Modal.Dialog>
      </div>
    );
  }
}

export default Message;
