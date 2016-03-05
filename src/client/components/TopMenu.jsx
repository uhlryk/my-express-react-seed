import React from 'react';
import { connect } from 'react-redux';
import * as RB from 'react-bootstrap';
import * as Actions from '../actions/index.js';

@connect(state => ({
  page: state.page
}))
class TopMenu extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.onGoToHomePage = this.onGoToHomePage.bind(this);
    this.onGoToListItemPage = this.onGoToListItemPage.bind(this);
    this.onGoToCreateItemPage = this.onGoToCreateItemPage.bind(this);
  }

  onGoToHomePage() {
    this.context.router.push('/');
  }

  onGoToListItemPage() {
    this.context.router.push('/list-item');
  }

  onGoToCreateItemPage() {
    this.context.router.push('/create-item');
  }

  render() {
    return (
      <RB.Navbar>
        <RB.Navbar.Header>
          <RB.Navbar.Brand ><a href="#" onClick={this.onGoToHomePage} >Some App</a></RB.Navbar.Brand>
          <RB.Navbar.Toggle />
        </RB.Navbar.Header>
        <RB.Navbar.Collapse>
          <RB.Nav>
            <RB.NavItem eventKey={1} onClick={this.onGoToHomePage}>Home</RB.NavItem>
            <RB.NavItem eventKey={2} onClick={this.onGoToListItemPage} >List Item</RB.NavItem>
            <RB.NavItem eventKey={3} onClick={this.onGoToCreateItemPage} >Create Item</RB.NavItem>
          </RB.Nav>
        </RB.Navbar.Collapse>
      </RB.Navbar>
    );
  }
}

export default TopMenu;
