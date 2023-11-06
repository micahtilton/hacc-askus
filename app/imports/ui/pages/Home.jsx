import React from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import AboutHoku from "./AboutHoku";

/* A simple static component to render some text for the landing page. */
const Home = () => (
  <Container fluid>
    <AboutHoku />
  </Container>
);

export default Home;
