import React from 'react';
import { Container, Navbar, Nav, Image, NavLink, Button } from 'react-bootstrap';
import { Facebook, Instagram, Twitter, Youtube } from 'react-bootstrap-icons';

const NavBar = () => (
    <Navbar expand='lg'>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Nav className='justify-content-start'>
          <a href='/'>
            <Image src='https://www.hawaii.edu/askus/styles-2016/images/its_logo_uppercase_out.png' />
          </a>
        </Nav>
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-center'>
          <Nav>
            <Nav.Link href='#'>HELP DESK</Nav.Link>
            <Nav.Link href='#'>SERVICES</Nav.Link>
            <Nav.Link href='#'>INFORMATION SECURITY</Nav.Link>
            <Nav.Link href='#'>ALERTS</Nav.Link>
            <Nav.Link href='#'>ABOUT</Nav.Link>
            <Button variant="outline-dark" size='sm' id="btn">CONTACT US</Button>
          </Nav>
        </Navbar.Collapse>
        <Nav className='justify-content-end' id='socials'>
          <Nav.Link href='https://twitter.com/UHawaiiNews'><Twitter /></Nav.Link>
          <Nav.Link href='https://www.facebook.com/universityofhawaii'><Facebook/></Nav.Link>
          <Nav.Link href='https://instagram.com/uhawaiinews/'><Instagram/></Nav.Link>
          <Nav.Link href='https://www.youtube.com/user/uhmagazine'><Youtube/></Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );




export default NavBar;