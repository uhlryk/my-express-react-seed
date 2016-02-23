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
    this.onGoToListPage = this.onGoToListPage.bind(this);
  }

  onGoToHomePage() {
    this.context.router.push('/');
  }

  onGoToListPage() {
    this.context.router.push('/list');
  }

  render() {
    return (
      <RB.Navbar>
        <RB.Navbar.Header>
          <RB.Navbar.Brand ><a href="#" onClick={this.onGoToHomePage} >Mymedia</a></RB.Navbar.Brand>
          <RB.Navbar.Toggle />
        </RB.Navbar.Header>
        <RB.Navbar.Collapse>
          <RB.Nav>
            <RB.NavItem eventKey={1} onClick={this.onGoToHomePage}>Home</RB.NavItem>
            <RB.NavItem eventKey={2} onClick={this.onGoToListPage} >List Item</RB.NavItem>
          </RB.Nav>
        </RB.Navbar.Collapse>
      </RB.Navbar>
    );
  }
}

export default TopMenu;
