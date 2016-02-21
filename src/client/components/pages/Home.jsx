import React from 'react';
import * as RB from 'react-bootstrap';
class Home extends React.Component {

  render() {
    return (
      <div className="row">
        <RB.Jumbotron>
          <h1>HOME PAGE</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium animi atque
            dignissimos eius eum iste nesciunt nisi obcaecati quibusdam rem? Ad consequatur culpa
            eveniet modi nobis nulla, pariatur repellendus sapiente!
          </p>
          <p><RB.Button bsStyle="primary">Learn more</RB.Button></p>
        </RB.Jumbotron>
      </div>
    );
  }
}

export default Home;
