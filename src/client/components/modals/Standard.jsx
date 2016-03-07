import React from 'react';
import * as RB from 'react-bootstrap';

class Standard extends React.Component {

  static propsTypes = {
    title: React.PropTypes.string,
    body: React.PropTypes.string,
    onClose: React.PropTypes.func,
    showModal: React.PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  close() {
    this.props.onClose();
  }

  render() {
    return (
      <RB.Modal show={this.props.showModal} onHide={this.close}>
        <RB.Modal.Header>
          <RB.Modal.Title>{this.props.title}</RB.Modal.Title>
        </RB.Modal.Header>

        <RB.Modal.Body>
          {this.props.body}
        </RB.Modal.Body>

        <RB.Modal.Footer>
          <RB.Button bsStyle="primary" onClick={this.close}>close</RB.Button>
        </RB.Modal.Footer>

      </RB.Modal>
    );
  }
}

export default Standard;
