import React from "react";
import { Container, Navbar, Nav, Image, NavLink } from "react-bootstrap";

const NavBar = () => (
  <Navbar expand="lg">
    <Container>
      <Navbar.Brand as={NavLink} to="https://www.hawaii.edu/askus/">
        <Image src="https://www.hawaii.edu/askus/styles-2016/images/its_logo_uppercase_out.png" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="justify-content-center">
          <Nav.Link href="#">HELP DESK</Nav.Link>
          <Nav.Link href="#">SERVICES</Nav.Link>
          <Nav.Link href="#">INFORMATION SECURITY</Nav.Link>
          <Nav.Link href="#">ALERTS</Nav.Link>
          <Nav.Link href="#">ABOUT</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavBar;
