import React from 'react';
import * as RB from 'react-bootstrap';
class List extends React.Component {

  static contextTypes = {
    request: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state= {};
  }

  componentWillMount() {
  }

  handleNameChange(evt) {
    this.setState({
      name: evt.target.value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.context.request.postRequest('http://localhost:3000/api/items', {
      name: this.state.name
    }, {},(err, res)=>{
      this.context.router.push('/list-item');
    });
  }

  renderLoading() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <RB.Input
            type="text"
            value={this.state.name}
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
    return this.renderLoading();
  }
}

export default List;
