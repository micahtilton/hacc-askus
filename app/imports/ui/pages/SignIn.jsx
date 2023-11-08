import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { EnvelopeAtFill, LockFill } from 'react-bootstrap-icons';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const resetForm = () => {
    setEmail('');
    setPassword('');
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
    <Navigate to="/" />
  ) : (
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
              <Image src="/images/NEW-Hoku.png" roundedCircle style={{ width: '90px', height: '90px' }} />
              <h2>Sign In</h2>
            </Col>
            <Form.Group className="pb-3">
              <Form.Label className="mb-0 mx-sm-3">Email address</Form.Label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
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
              <div style={{ display: 'flex', alignItems: 'center' }}>
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
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
