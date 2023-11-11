import React from "react";
import { Container, Row, Spinner } from "react-bootstrap";

// Displays a loading spinner if the page is loading
const LoadingSpinner = () => (
  <Container className={"p-3"}>
    <Row className="justify-content-md-center">
      <Spinner animation="border" />
      Loading
    </Row>
  </Container>
);

export default LoadingSpinner;
