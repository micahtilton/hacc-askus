import React from "react";
import { Container, Row, Spinner } from "react-bootstrap";

const LoadingSpinner = () => (
  <Container className={"p-3"}>
    <Row className="justify-content-md-center">
      <Spinner animation="border" />
      Getting data
    </Row>
  </Container>
);

export default LoadingSpinner;
