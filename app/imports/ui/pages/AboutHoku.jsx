import { Col, Image, Row } from 'react-bootstrap';
import React from 'react';

const AboutHoku = () => (
  <Row className="align-middle text-center m-5">
    <Col lg={8} className="">
      <div className="text-animation">MEET</div>
      <div className="text-animation"><span>HOKU</span></div>
      <p>Ask Us is a knowledge base of frequently asked questions (FAQs) related to information technology. Enter keywords related to your question in the search box, then click on "Ask Us". FAQs that match the keywords will be displayed.
        Click on the match that best answers your question. Click on "Ask Us" again to return to the list of matches, or enter new keywords for a new search.
      </p>
    </Col>
    <Col className="align-middle">
      <Image src="images/Hoku.png" id="hoku" fluid/>
    </Col>
  </Row>
);

export default AboutHoku;
