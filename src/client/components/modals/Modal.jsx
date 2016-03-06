import React from 'react';
import * as RB from 'react-bootstrap';
import { connect } from 'react-redux';

@connect(state => ({
  modal: state.modal
}))
class Modal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    }
    this.close = this.close.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.modal) {
      this.setState({
        showModal: true,
        title: nextProps.modal.title,
        body: nextProps.modal.body,
        button1: nextProps.modal.button1
      });
    }
  }

  close() {
    this.setState({
      showModal: false,
      title: null,
      body: null,
      button1: null
    });
  }

  render() {
    let button1 = null;
    if(this.state.button1) {
      button1 = (
        <RB.Button bsStyle="primary" onClick={this.close}>{this.state.button1}</RB.Button>
      );
    }
    return (
      <RB.Modal show={this.state.showModal} onHide={this.close}>
        <RB.Modal.Header>
          <RB.Modal.Title>{this.state.title}</RB.Modal.Title>
        </RB.Modal.Header>

        <RB.Modal.Body>
          {this.state.body}
        </RB.Modal.Body>

        <RB.Modal.Footer>
          {button1}
        </RB.Modal.Footer>

      </RB.Modal>
    );
  }
}

export default Modal;
