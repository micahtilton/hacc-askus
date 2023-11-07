import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { EnvelopeAtFill, LockFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleSubmit = () => {
    if (password === "" || email === "") {
      setError("Please Enter an Email and Password");
      return;
    }
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        resetForm();
        setError("Incorrect Username or Password");
      } else {
        resetForm();
        navigate("/admin/report");
      }
    });
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col sm={6}>
          <Form
            id="login"
            className="p-3 m-5 rounded-3 border border-2 bg-white"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Col className="text-center">
              <Image src="/images/hoku-pfp.png" className={"mb-3"} width={90} />
              <h2>Admin Login</h2>
            </Col>
            <Form.Group className="pb-3">
              <Form.Label className="mb-0 mx-sm-3">Email address</Form.Label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <EnvelopeAtFill className="mx-sm-3 mb-1" size="20" id="envelope" />
                <Form.Control
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </Form.Group>

            <Form.Group className="pb-3">
              <Form.Label className="mb-0 mx-sm-3">Password</Form.Label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <LockFill className="mx-sm-3 mb-1" size="20" id="lock" />
                <Form.Control
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </Form.Group>
            {error !== "" && <div className={"text-danger text-center"}>{error}</div>}
            <Button className={"btn-vibrant-primary"} type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLogin;
