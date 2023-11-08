import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Search = () => {
  return (
    <Container className="m-3">
      <Row>
        <Col sm={4}>
          <Form className="d-flex">
            <Form.Control type="search" placeholder="Search" className="me-2 rounded-pill" aria-label="Search" />
            <Button className="rounded-pill" variant="outline-primary">
              Search
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
