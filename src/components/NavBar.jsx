import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink} from 'reactstrap';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

    render() {
        return (
            <div>
                <Navbar light expand="md">
          <NavbarBrand href="/">Well Calendar</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">A Nav Link</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Another Nav Link</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
            </div>
        )
    }
}
export default NavBar;
