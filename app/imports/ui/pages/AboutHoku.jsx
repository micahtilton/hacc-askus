import { Button, Col, Image, Row } from "react-bootstrap";
import React from "react";

const AboutHoku = () => (
  <Row className="align-middle text-center m-5" xs={1} md={2}>
    <Col className="text-center">
      <h1 className="text-animation">MEET HOKU</h1>
      <p>
        Ask Us is a knowledge base of frequently asked questions (FAQs) related to information technology. Enter
        keywords related to your question in the search box, then click on "Ask Us". FAQs that match the keywords will
        be displayed. Click on the match that best answers your question. Click on "Ask Us" again to return to the list
        of matches, or enter new keywords for a new search.
      </p>
      <button type="btn" className="btn btn-outline-dark">Learn More</button>
    </Col>
    <Col className="align-content-center">
      <Image src="images/Hoku.png" id="hoku" />
    </Col>
  </Row>
);

export default AboutHoku;
