import React, { useState } from "react";
import { Container, Navbar, Nav, Image } from "react-bootstrap";
import { BoxArrowRight, Facebook, Instagram, Twitter, Youtube } from "react-bootstrap-icons";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router";

function Logo() {
  return (
    <div className={"d-flex"}>
      <Image height={55} src={"images/logo.png"} className={"pe-2 align-self-center"} />
      <div className={"logo"}>
        <div className={"m-0 p-0"}>Information</div>
        <div className={"m-0 p-0"}>Technology</div>
        <div className={"m-0 p-0"}>Services</div>
      </div>
    </div>
  );
}

const NavBar = () => {
  const loggedIn = useTracker(() => Meteor.userId() !== null);
  const navigate = useNavigate();
  const username = useTracker(() => (Meteor.user() === null ? "" : Meteor.user().username));

  return (
    <Navbar expand="lg" className={"d-flex"}>
      <Container>
        <Navbar.Brand href="/">
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={"ms-auto"}>
            <Nav.Link href="/helpdesk">HELP DESK</Nav.Link>
            <Nav.Link href="#">SERVICES</Nav.Link>
            <Nav.Link href="#">INFORMATION SECURITY</Nav.Link>
            <Nav.Link href="#">ALERTS</Nav.Link>
            <Nav.Link href="#">ABOUT</Nav.Link>
            <Nav.Link href="#">CONTACT US</Nav.Link>
          </Nav>

          <Nav className={"d-flex justify-content-center mx-auto"}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <Nav.Link href="https://twitter.com/UHawaiiNews" className={"p-2"}>
              <Twitter />
            </Nav.Link>
            <Nav.Link href="https://www.facebook.com/universityofhawaii" className="p-2">
              <Facebook />
            </Nav.Link>
            <Nav.Link href="https://instagram.com/uhawaiinews/" className={"p-2"}>
              <Instagram />
            </Nav.Link>
            <Nav.Link href="https://www.youtube.com/user/uhmagazine" className={"p-2"}>
              <Youtube />
            </Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
        {loggedIn && (
          <Nav.Link
            href="#"
            onClick={() => {
              Meteor.logout();
              navigate("/");
            }}
          >
            <div>
              {username}
              <BoxArrowRight className={"ms-2"} />
            </div>
          </Nav.Link>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
