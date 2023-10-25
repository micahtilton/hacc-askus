import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { Hello } from '../components/Hello';
import { Info } from '../components/Info';

/* A simple static component to render some text for the landing page. */
const Home = () => (
  <Container>
    <h1>Welcome to Meteor!</h1>
    This is the home page.
    <Hello/>
    <Info/>
  </Container>
);

export default Home;
