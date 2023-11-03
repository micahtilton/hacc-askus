import React from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import AboutHoku from './AboutHoku';

/* A simple static component to render some text for the landing page. */
const Home = () => (
  <Container fluid>
    <Row>
      <div className="its-image d-flex flex-column justify-content-end p-0">
        <div className="aloha text-center pb-5">Aloha</div>
        <div className="banner h-25 text-center p-4">INFORMATION TECHNOLOGY SERVICES</div>
      </div>
    </Row>
    <Row className="divider"></Row>
    <AboutHoku />
  </Container>
);

export default Home;
