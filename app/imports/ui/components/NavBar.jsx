import React from 'react';
import { Container, Navbar, Nav, Image, Button } from 'react-bootstrap';
import { Facebook, Instagram, Twitter, Youtube } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';


const NavBar = () => (
  <Navbar className="nav" expand='lg'>
    <Container>
      <Nav className="justify-content-start position-relative">
        <Navbar.Brand as={NavLink} to="/">
          <Image src='https://www.hawaii.edu/askus/styles-2016/images/its_logo_uppercase_out.png'/>
        </Navbar.Brand>
      </Nav>
      <Navbar.Collapse id="basic-navbar-nav" className='justify-content-center'>
        <Nav className="justify-content-center">
          <Nav.Link as={NavLink} to="/helpdesk">HELP DESK</Nav.Link>
          <Nav.Link href='#'>SERVICES</Nav.Link>
          <Nav.Link href='#'>INFORMATION SECURITY</Nav.Link>
          <Nav.Link href='#'>ALERTS</Nav.Link>
          <Nav.Link href='#'>ABOUT</Nav.Link>
          <Nav.Link href='#'>CONTACT US</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Nav className="justify-content-end" id='socials'>
          <Nav.Link href='https://twitter.com/UHawaiiNews'><Twitter/></Nav.Link>
          <Nav.Link href='https://www.facebook.com/universityofhawaii'><Facebook/></Nav.Link>
          <Nav.Link href='https://instagram.com/uhawaiinews/'><Instagram/></Nav.Link>
          <Nav.Link href='https://www.youtube.com/user/uhmagazine'><Youtube/></Nav.Link>
        </Nav>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
    </Container>
  </Navbar>
);


export default NavBar;
