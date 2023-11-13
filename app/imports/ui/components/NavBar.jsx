import React from "react";
import { Container, Navbar, Nav, Image } from "react-bootstrap";
import { BoxArrowRight, DoorOpen } from "react-bootstrap-icons";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';

function Logo() {
  return (
    <div className={"d-flex"}>
      <Image height={55} src={"images/logo.png"} className={"pe-2 align-self-center"} alt={"Hoku Picture"} />
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

  // Renders the navbar
  return (
    <Navbar expand="lg" className={"text-center navbar-dark mb-3"}>
      <Container>
        <Navbar.Brand
          href="#"
          onClick={() => {
            navigate("/");
          }}
        >
          <Logo />
        </Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={"mx-auto"}>
            <Nav.Link href="https://www.hawaii.edu/its/services/">SERVICES</Nav.Link>
            <Nav.Link href="https://www.hawaii.edu/infosec/">INFORMATION SECURITY</Nav.Link>
            <Nav.Link href="https://www.hawaii.edu/its/alerts/">ALERTS</Nav.Link>
            <Nav.Link href="https://www.hawaii.edu/its/about/">ABOUT</Nav.Link>
            <Nav.Link href="https://www.hawaii.edu/its/contact/">CONTACT ITS</Nav.Link>
          </Nav>
          {isAdmin && (
            // If the current user is signed in and is an admin, display the FAQ and Report in the NavBar
            <Nav className={"d-flex justify-content-center me-auto"}>
              <br />
              <Nav.Link
                onClick={() => {
                  navigate("/admin/faq");
                }}
                href="#"
                className={"p-2"}
              >
                FAQ
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/admin/report");
                }}
                className={"p-2"}
              >
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
              toast.success('Signed Out Successfully');
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
              navigate("/signin");
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
