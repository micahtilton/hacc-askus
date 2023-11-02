import React from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';

/* A simple static component to render some text for the landing page. */
const Home = () => (
  <Container className="py-4 ">
    <Row className="align-middle text-center">
      <Col lg={8} className="">
        <h1>Meet Hoku!</h1>
        <p>Ask Us is a knowledge base of frequently asked questions (FAQs) related to information technology. Enter keywords related to your question in the search box, then click on "Ask Us". FAQs that match the keywords will be displayed.
          Click on the match that best answers your question. Click on "Ask Us" again to return to the list of matches, or enter new keywords for a new search.
        </p>
        <Button>Ask a Question</Button>
      </Col>
      <Col className="align-middle">
        <Image src="images/Hoku.png" id="hoku" fluid className="p-4"/>
      </Col>
    </Row>
  </Container>
);

export default Home;
