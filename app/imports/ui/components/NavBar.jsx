import React from "react";
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

  return (
    <Navbar expand="lg" className={"navbar-main d-flex"}>
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
            {loggedIn && (
              <Nav.Link
                href="#"
                onClick={() => {
                  Meteor.logout();
                  navigate("/");
                }}
              >
                {Meteor.user() && (
                  <div>
                    {Meteor.user().username}
                    <BoxArrowRight className={"ms-2"} />
                  </div>
                )}
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
