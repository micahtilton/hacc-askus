import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { EnvelopeFill, LockFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  // Uses Meteor's account mechanism to handle sign in
  const handleSubmit = () => {
    // Returns an error if the user does not enter a password or email
    if (password === "" || email === "") {
      setError("Please Enter an Email and Password");
      return;
    }
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        resetForm();
        // Returns an error if the user enters an incorrect password or email
        setError("Incorrect Username or Password");
        toast.error("Unsuccessful Sign In");
      } else {
        resetForm();
        // Returns user to Home page after successful sign in
        navigate("/");
        toast.success("Signed In Successfully");
      }
    });
  };

  // Render the signin form
  return (
    <Container className="py-5">
      <Row className="justify-content-center text-center">
        <Col lg={8}>
          <Form
            id="login"
            className="p-3 m-5 rounded-3 bg-white border border-2 shadow-lg"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Col className="text-center">
              <Image src="/images/hoku-pfp.png" className={"mb-3"} width={90} alt={"Hoku Picture"} />
              <h2>Sign In</h2>
            </Col>
            <Form.Group className="pb-3">
              <div style={{ display: "flex", alignItems: "center" }}>
                <EnvelopeFill className="d-none d-sm-inline me-2" size="25" id="envelope" />
                <Form.Control
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  className={"p-2 rounded-pill bg-info-subtle"}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </Form.Group>

            <Form.Group className="pb-3">
              <div style={{ display: "flex", alignItems: "center" }}>
                <LockFill className="d-none d-sm-inline me-2" size="25" id="lock" />
                <Form.Control
                  id="password"
                  type="password"
                  placeholder="Password"
                  className={"p-2 rounded-pill bg-info-subtle"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </Form.Group>
            {error !== "" && <div className={"text-danger text-center"}>{error}</div>}
            <Button className={"btn-vibrant-primary rounded-pill"} type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
