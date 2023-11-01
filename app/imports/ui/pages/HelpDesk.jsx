import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';

const HelpDesk = () => (
  <Container className="py-3" id="helpDesk">
    <Row className="align-middle text-center">
      <Col>
        <Image src="images/contact-info-img.png" id="hd-images"/>
        <h1>Contact Information</h1>
        <h6>Phone: (808) 956-8883</h6>
        <h6>Toll Free: (neighbor isles) (800) 558-2669</h6>
        <h6>Email: help@hawaii.edu</h6>
      </Col>
      <Col>
        <Image src="images/live-support-img.png" width="200px" id="hd-images"/>
        <h1>Live Chat Support Hours</h1>
        <h5>9/1/2023 Special Hours: 8:00am - 11:00am</h5>
        <h6>Monday - Friday, 8:00am - 3:00pm (excluding Holidays)</h6>
        <h6><a href="https://www.hawaii.edu/help/chat/">Click here to chat with us. </a></h6>
      </Col>
      <Col>
        <Image src="images/phone-email-hours.png" width="200px" id="hd-images"/>
        <h1>Phone and Email Support Hours</h1>
        <h6>24 hours a day, 7 days a week</h6>
        <h6>Open during all Holidays </h6>
      </Col>
    </Row>
  </Container>
);

export default HelpDesk;