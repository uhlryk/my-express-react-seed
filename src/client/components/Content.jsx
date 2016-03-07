import React from 'react';
import TopMenu from './TopMenu.jsx';
import { connect } from 'react-redux';
import Modal from './modals/Modal.jsx';
import NotificationSystem from 'react-notification-system';
import { HIDE_MODAL } from '../actions/index';

@connect(state => ({
  modal: state.modal
}))
class Content extends React.Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.props.dispatch({
      type: HIDE_MODAL
    });
  }

  render() {
    console.log(this.props.modal);
    return (
      <div>
        <TopMenu />
        <div className="container">
          {this.props.children}
        </div>
        <Modal {...this.props.modal} onClose={this.closeModal} />
        <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }
}

export default Content;
