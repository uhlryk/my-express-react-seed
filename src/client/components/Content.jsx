import React from 'react';
import TopMenu from './TopMenu.jsx';

class Content extends React.Component {

  render() {
    return (
      <div>
        <TopMenu />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Content;
