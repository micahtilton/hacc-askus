import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";

const Footer = () => (
  <footer className="mt-auto py-3">
    <Container>
      <Row>
        <Col>
          <h4>MAILING ADDRESS</h4>
          <p>Information Technology Services</p>
          <p>2520 Correa Road</p>
          <p>Honolulu, HI 96822</p>
        </Col>
        <Col className="text-center">
          <h4>STUDENT EMPLOYMENT</h4>
          <p>
            Information Technology Services posts available positions for UH students on{" "}
            <a href="http://www.hawaii.edu/sece/">SECE</a>{" "}
          </p>
        </Col>
        <Col className="text-center">
          <h4>UH SYSTEM HOME</h4>
          <a href="https://www.hawaii.edu/">
            <Image src="https://www.hawaii.edu/askus/styles-2016/images/UHSystemLogo240white-e1431548955359.png" />
          </a>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
