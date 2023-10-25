import React from 'react';
import { Container, Navbar, Nav, Image } from 'react-bootstrap';

const NavBar = () => (
  <Navbar expand='lg'>
    <Nav className='justify-content-start'>
      <Image src='https://www.hawaii.edu/askus/styles-2016/images/its_logo_uppercase_out.png'/>
    </Nav>
  </Navbar>
);

export default NavBar;