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

  componentDidMount() {
    this.context.request.getRequest({
      url: '/items',
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
  actionUpdate(id) {
    this.context.router.push('/update-item/' + id);
  }
  actionDelete(id) {
    this.context.request.deleteRequest({
      url: 'http://localhost:3000/api/items/' + id,
      endCallback: (err, req, res)=> {
        var list = [];
        if (res.status === 200) {
          var list = this.state.list.filter((elem) => {
            if(elem.id === id) {
              return false;
            }
            return true;
          });
          this.setState({
            list
          });
        }
      }
    });
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
          <td>
            <RB.ButtonToolbar>
              <RB.Button bsStyle="primary" onClick={this.actionView.bind(this, elem.id)}>View</RB.Button>
              <RB.Button bsStyle="warning" onClick={this.actionUpdate.bind(this, elem.id)}>Update</RB.Button>
              <RB.Button bsStyle="danger" onClick={this.actionDelete.bind(this, elem.id)}>Delete</RB.Button>
            </RB.ButtonToolbar>
          </td>
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
