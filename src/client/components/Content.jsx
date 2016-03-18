import React from 'react';
import TopMenu from './TopMenu.jsx';
import { connect } from 'react-redux';
import Modal from './modals/Modal.jsx';
import NotificationSystem from 'react-notification-system';
import { HIDE_MODAL } from '../actions/index';

@connect(state => ({
  modal: state.modal,
  user: state.user
}))
class Content extends React.Component {

  static childContextTypes = {
    showNotification: React.PropTypes.func
  };

  static contextTypes = {
    request: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.props.dispatch({
      type: HIDE_MODAL
    });
  }
  getChildContext() {
    return {
      showNotification: (optionsOrMessage, title, level) => {
        if(typeof optionsOrMessage === 'string'){
          this._notificationSystem.addNotification({
            message: optionsOrMessage,
            title,
            level: level || 'info'
          });
        } else {
          this._notificationSystem.addNotification(optionsOrMessage);
        }
      }
    }
  }
  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.user && nextProps.user.token) {
      this.context.request.addHeader('access-token', nextProps.user.token);
    } else {
      this.context.request.removeHeader('access-token');
    }
  }

  render() {
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
