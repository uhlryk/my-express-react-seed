import React from 'react';
import * as RB from 'react-bootstrap';
class Detail extends React.Component {

  static contextTypes = {
    request: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.params.id,
      details: {},
      loading: true
    };
  }

  componentDidMount() {
    this.context.request.getRequest({
      url: 'http://localhost:3000/api/items/' + this.state.id,
      endCallback: (err, req, res)=> {
        var details = {};
        if (res.body ) {
          details = res.body;
        }
        this.setState({
          loading: false,
          details
        });
      }
    });
  }

  renderLoading() {
    return (
      <div className="row">
        <h2>...LOADING...</h2>
      </div>
    );
  }

  renderEmptyDetails() {
    return (
      <div className="row">
        <h2>Not Find</h2>
      </div>
    );
  }

  actionView(id) {
    this.context.router.push('/detail-item/' + id);
  }
  actionUpdate(id) {
    this.context.router.push('/update-item/' + id);
  }

  renderDetails() {
    var list = [];
    Object.keys(this.state.details).forEach((key) => {
      list.push(
        <tr key={key}>
          <td>{key}</td>
          <td>{this.state.details[key]}</td>
          <td></td>
        </tr>
      );
    });
    return (
      <div className="row">
        <table className="table table-striped table-hover">
          <thead>
          <tr>
            <th>key</th>
            <th>value</th>
          </tr>
          </thead>
          <tbody>
          {list}
          </tbody>
        </table>
        <RB.ButtonToolbar>
          <RB.Button bsStyle="warning" onClick={this.actionUpdate.bind(this, this.state.id)}>Update</RB.Button>
        </RB.ButtonToolbar>
      </div>
    );
  }

  render() {
    if(this.state.loading) {
      return this.renderLoading();
    } else if(Object.keys(this.state.details).length === 0) {
      return this.renderEmptyDetails();
    } else if(Object.keys(this.state.details).length > 0) {
      return this.renderDetails();
    }
  }
}

export default Detail;
