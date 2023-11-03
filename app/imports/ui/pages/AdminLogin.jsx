import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Navigate, redirect } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };
  const handleSubmit = () => {
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        resetForm();
      } else {
        resetForm();
        setRedirect(true);
      }
    });
  };

  return redirect ? (
    <Navigate to="/admin/report" />
  ) : (
    <Container>
      <Form
        className={"p-3 m-5 rounded-3 border border-2 bg-white "}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <h2 className={"pb-3"}>Sign In</h2>
        </div>
        <Form.Group className={"pb-3"}>
          <Form.Label className={"mb-0"}>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className={"mb-0"}>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AdminLogin;
