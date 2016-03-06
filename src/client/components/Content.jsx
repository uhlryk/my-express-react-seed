import React from 'react';
import TopMenu from './TopMenu.jsx';
import Modal from './modals/Modal.jsx';
import NotificationSystem from 'react-notification-system';

class Content extends React.Component {

  render() {
    return (
      <div>
        <TopMenu />
        <div className="container">
          {this.props.children}
        </div>
        <Modal />
        <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }
}

export default Content;
