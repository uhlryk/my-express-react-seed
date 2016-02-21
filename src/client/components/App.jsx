import React from 'react';
import TopMenu from './TopMenu.jsx';

class App extends React.Component {

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

export default App;
