import React from 'react';
import * as RB from 'react-bootstrap';
class List extends React.Component {

  static contextTypes = {
    request: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: true
    };
  }

  componentWillMount() {
    this.context.request.getRequest({
      url: 'http://localhost:3000/api/items',
      endCallback: (err, req, res)=> {
        var list = [];
        if (res.body && res.body.length > 0) {
          list = res.body;
        }
        this.setState({
          loading: false,
          list
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

  renderEmptyList() {
    return (
      <div className="row">
        <h2>Empty List</h2>
      </div>
    );
  }
  actionView(id) {
    this.context.router.push('/detail-item/' + id);
  }

  renderList() {
    var list = [];
    this.state.list.forEach((elem) => {
      list.push(
        <tr key={elem.id}>
          <td>{elem.id}</td>
          <td>{elem.name}</td>
          <td>{elem.createdAt}</td>
          <td>{elem.updatedAt}</td>
          <td><RB.Button bsStyle="primary" onClick={this.actionView.bind(this, elem.id)}>View</RB.Button></td>
        </tr>
      );
    });
    return (
      <div className="row">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>name</th>
              <th>created</th>
              <th>edited</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
          {list}
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    if(this.state.loading) {
      return this.renderLoading();
    } else if(this.state.list.length === 0) {
      return this.renderEmptyList();
    } else if(this.state.list.length > 0) {
      return this.renderList();
    }
  }
}

export default List;