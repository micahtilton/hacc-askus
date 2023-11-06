import React, { useState } from "react";
import { Container, Navbar, Nav, Image } from "react-bootstrap";
import { BoxArrowRight, DoorOpen, DoorOpenFill, Facebook, Instagram, Twitter, Youtube } from "react-bootstrap-icons";
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
  const userId = useTracker(() => Meteor.userId());
  const loggedIn = userId !== null;
  const isAdmin = loggedIn ? Roles.userIsInRole(userId, "admin") : false;
  const navigate = useNavigate();

  const username = useTracker(() => {
    const user = Meteor.user();
    if (user) {
      return user.username;
    }
    return "";
  });

  return (
    <Navbar expand="lg" className={"text-center navbar-dark"}>
      <Container>
        <Navbar.Brand href="/">
          <Logo />
        </Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={"mx-auto"}>
            <Nav.Link href="#">SERVICES</Nav.Link>
            <Nav.Link href="#">INFORMATION SECURITY</Nav.Link>
            <Nav.Link href="#">ALERTS</Nav.Link>
            <Nav.Link href="#">ABOUT</Nav.Link>
            <Nav.Link href="#">CONTACT US</Nav.Link>
          </Nav>
          {isAdmin && (
            <Nav className={"d-flex justify-content-center me-auto"}>
              <Nav.Link href="/admin/faq" className={"p-2"}>
                FAQ
              </Nav.Link>
              <Nav.Link href="/admin/report" className={"p-2"}>
                Reports
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
        {loggedIn ? (
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
        ) : (
          <Nav.Link
            href="#"
            onClick={() => {
              Meteor.logout();
              navigate("/admin");
            }}
          >
            <div>
              Sign In
              <DoorOpen className={"ms-2"} />
            </div>
          </Nav.Link>
        )}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
  );
};

export default NavBar;
