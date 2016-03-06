import React from 'react';
import TopMenu from './TopMenu.jsx';
import Modal from './modals/Modal.jsx';

class Content extends React.Component {

  render() {
    return (
      <div>
        <TopMenu />
        <div className="container">
          {this.props.children}
        </div>
        <Modal />
      </div>
    );
  }
}

export default Content;
