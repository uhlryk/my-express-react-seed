import React from 'react';
import * as RB from 'react-bootstrap';
class List extends React.Component {

  static contextTypes = {
    request: React.PropTypes.object
  };

  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.context.request.getRequest('http://localhost:3000/api/items', {}, (err, res)=>{
      console.log(err);
      console.log(res);
    });
  }

  renderLoading() {
    return (
      <div className="row">
        <h2>...LOADING...</h2>
      </div>
    );
  }

  render() {
    return this.renderLoading();
  }
}

export default List;
