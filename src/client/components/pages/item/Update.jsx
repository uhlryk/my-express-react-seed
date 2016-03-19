import React from 'react';
import * as RB from 'react-bootstrap';
import Loading from '../../helpers/Loading.jsx';

class Update extends React.Component {

  static contextTypes = {
    request: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
    showNotification: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      id: this.props.params.id,
      details: {},
      loading: true
    };
  }

  componentDidMount() {
    this.context.request.getRequest({
      url: '/items/' + this.state.id,
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

  handleNameChange(evt) {
    this.setState({
      details: Object.assign({}, this.state.details, { name: evt.target.value})
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.context.request.putRequest({
      url: '/items/'+ this.state.id,
      body: {
        ...this.state.details
      }, endCallback: (err, req, res)=> {
        this.context.showNotification('Item was updated');
        this.context.router.push('/detail-item/' + this.state.id);
      }
    });
  }

  renderLoading() {
    return (
      <Loading />
    );
  }

  renderEmptyDetails() {
    return (
      <div className="row">
        <h2>Not Find</h2>
      </div>
    );
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <RB.Input
            type="text"
            value={this.state.details.name}
            placeholder="Enter name"
            label="Name"
            ref="nameInput"
            help="Validation is based on string length."
            groupClassName="group-class"
            labelClassName="label-class"
            onChange={this.handleNameChange} />
          <RB.ButtonInput type="submit" value="Submit Button" />
        </div>
      </form>
    );
  }

  render() {
    if(this.state.loading) {
      return this.renderLoading();
    } else if(Object.keys(this.state.details).length === 0) {
      return this.renderEmptyDetails();
    } else if(Object.keys(this.state.details).length > 0) {
      return this.renderForm();
    }
  }
}

export default Update;
