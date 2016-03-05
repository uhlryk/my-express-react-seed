import React from 'react';
import MessagePage from '../../MessagePage.jsx';
class SuccessSignOn extends React.Component {


  render() {
    return (
      <MessagePage
        title="Success"
        message="your account has been successfully created"
        button="home"
        path="/"
      />
    );
  }
}

export default SuccessSignOn;
