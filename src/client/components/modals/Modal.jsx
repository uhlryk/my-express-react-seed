import React from 'react';
import * as RB from 'react-bootstrap';

import Standard from './Standard.jsx';

class Modal extends React.Component {

  static propsTypes = {
    title: React.PropTypes.string,
    body: React.PropTypes.string,
    onClose: React.PropTypes.func,
    modalType: React.PropTypes.string,
    showModal: React.PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  close() {
    if(this.props.onClose) {
      this.props.onClose();
    }
  }

  render() {
    let modal = null;
    switch(this.props.modalType) {
      case 'Standard':
      default:
        modal = <Standard title={this.props.title} body={this.props.body} showModal={this.props.showModal} onClose={this.close} />;
    }
    return modal;
  }
}

export default Modal;
