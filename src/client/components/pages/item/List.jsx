import React from 'react';
import * as RB from 'react-bootstrap';
import { Link } from 'react-router';
import Loading from '../../helpers/Loading.jsx';

class List extends React.Component {

  static contextTypes = {
    request: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
    showNotification: React.PropTypes.func
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
      <Loading />
    );
  }

  renderEmptyList() {
    return (
      <div className="row">
        <h2>Empty List</h2>
      </div>
    );
  }
  actionDelete(id) {
    this.context.request.deleteRequest({
      url: '/items/' + id,
      endCallback: (err, req, res)=> {
        var list = [];
        if (res.status === 200) {
          this.context.showNotification('Item was deleted');
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
              <Link className="btn btn-primary" role="button" to={'/detail-item/' + elem.id}>View</Link>
              <Link className="btn btn-warning" role="button" to={'/update-item/' + elem.id}>Update</Link>
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
