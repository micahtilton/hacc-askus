import React from 'react';
import { Container, Navbar, Nav, Image, NavLink } from 'react-bootstrap';

const NavBar = () => (
  <Navbar expand='lg'>
    <Container>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          <Nav.Link href='#'>HELP DESK</Nav.Link>
          <Nav.Link href='#'>SERVICES</Nav.Link>
          <Nav.Link href='#'>INFORMATION SECURITY</Nav.Link>
          <Nav.Link href='#'>ALERTS</Nav.Link>
          <Nav.Link href='#'>ABOUT</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavBar;
