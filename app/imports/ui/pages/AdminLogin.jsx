import React from 'react';
import { Button, Card, Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap';

const AdminLogin = () => (
  <Container id="signin-page" className="py-3">
    <Row className="justify-content-center">
      <Col xs={5}>
        <Card>
          <Col className="text-center py-3" >
            <h2>Admin Login</h2>
          </Col>
          <Card.Body>
            <h6>Email Address</h6>
            <InputGroup>
              <FormControl type="text" placeholder="ENTER EMAIL ADDRESS" />
            </InputGroup>
          </Card.Body>
          <Button className="justify-content-center">Submit</Button>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default AdminLogin;
