import React from 'react';
import MessagePage from '../../helpers/MessagePage.jsx';
class SuccessSignOn extends React.Component {


  render() {
    return (
      <MessagePage
        title="Success"
        body="your account has been successfully created"
        label="home"
        path="/"
      />
    );
  }
}

export default SuccessSignOn;
