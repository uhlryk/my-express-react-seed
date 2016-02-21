import React from 'react';
import { connect } from 'react-redux';
import * as RB from 'react-bootstrap';
import * as Actions from '../../actions/index.js';

@connect(state => ({
}))
class NotFound extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.onGoToHomePage = this.onGoToHomePage.bind(this);
  }

  onGoToHomePage() {
    this.context.router.push('/');
  }

  render() {
    return (
      <div className="row">
        <RB.Jumbotron className="text-center">
          <p>Page Not Found</p>
          <p>
            <RB.Button bsStyle="primary" onClick={this.onGoToHomePage} >Home Page</RB.Button>
          </p>
        </RB.Jumbotron>
      </div>
    );
  }
}

export default NotFound;
