import React from 'react';
import { connect } from 'react-redux';
import * as RB from 'react-bootstrap';
import * as Actions from '../actions/index.js';
import { Link } from 'react-router';

@connect(state => ({
  user: state.user
}))
class TopMenu extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    let rightMenu = false;
    if(this.props.user) {
      rightMenu = (
        <RB.Nav pullRight>
          <RB.NavDropdown title={this.props.user.email} id='usermenu'>
            <li ><Link to='/logout'>Logout</Link></li>
          </RB.NavDropdown>
        </RB.Nav>
      );
    } else {
      rightMenu = (
        <RB.Nav pullRight>
          <li ><Link to='/sign-on'>Sign on</Link></li>
          <li ><Link to='/sign-in'>Sign in</Link></li>
        </RB.Nav>
      );
    }
    return (
      <RB.Navbar>
        <RB.Navbar.Header>
          <RB.Navbar.Brand ><Link to='/'>Some App</Link></RB.Navbar.Brand>
          <RB.Navbar.Toggle />
        </RB.Navbar.Header>
        <RB.Navbar.Collapse>
          <RB.Nav>
            <li ><Link to='/'>Home</Link></li>
            <li ><Link to='/list-item'>List Item</Link></li>
            <li ><Link to='/create-item'>Create Item</Link></li>

          </RB.Nav>
          {rightMenu}
        </RB.Navbar.Collapse>
      </RB.Navbar>
    );
  }
}

export default TopMenu;
