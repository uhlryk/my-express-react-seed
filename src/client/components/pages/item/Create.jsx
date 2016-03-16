import React from 'react';
import * as RB from 'react-bootstrap';
class Create extends React.Component {

  static contextTypes = {
    request: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
    showNotification: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state= {
      details: {}
    };
  }

  componentDidMount() {
  }

  handleNameChange(evt) {
    this.setState({
      details: Object.assign({}, this.state.details, { name: evt.target.value})
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.context.request.postRequest({
      url: '/items',
      body: {
        ...this.state.details
      }, endCallback: (err, req, res)=> {
        this.context.showNotification('Item was created');
        this.context.router.push('/detail-item/' + res.body.id);
      }
    });
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
    return this.renderForm();
  }
}

export default Create;
