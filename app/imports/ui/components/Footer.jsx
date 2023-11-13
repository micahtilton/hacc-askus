import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Facebook, Instagram, Twitter, Youtube } from "react-bootstrap-icons";

// Renders the footer
const Footer = () => (
  <footer className="mt-auto py-3 pb-5">
    <Container>
      <Row>
        <Col>
          <Row>
            <Image className={"pb-2"} src={"images/uh-footer-logo.png"} alt={"UH-Logo"} />
            <div>2444 Dole Street</div>
            <div>Honolulu, HI 96822</div>
          </Row>
        </Col>
        <Col>
          <Row>
            <div>
              An <a href={"https://www.hawaii.edu/offices/eeo/policies/"}>equal opportunity/affirmative action institution</a>
            </div>
            <div>
              Use of this site implies consent with out <a href={"https://www.hawaii.edu/infotech/policies/itpolicy.html"}>Usage Policy</a> copyright © 2023{" "}
              <a href={"https://www.hawaii.edu/"}>University of Hawaiʻi</a>
            </div>
          </Row>
        </Col>
        <Col>
          <Row>
            <div>
              <a href={"https://www.hawaii.edu/calendar/"}>Calendar</a>
            </div>
            <div>
              <a href={"https://www.hawaii.edu/directory/"}>Directory</a>
            </div>
            <div>
              <a href={"https://www.hawaii.edu/emergency/"}>Emergency Information</a>
            </div>
            <div>
              <a href={"https://myuh.hawaii.edu/"}>MyUH</a>
            </div>
            <div>
              <a href={"https://www.hawaii.edu/privacy/"}>Privacy Statement</a>
            </div>
            <div>
              <a href={"http://workatuh.hawaii.edu/"}>Work at UH</a>
            </div>
          </Row>
        </Col>
        <Col>
          <Row>
            <div>
              <Twitter className={"m-2"} />
              <Facebook className={"m-2"} />
              <Instagram className={"m-2"} />
              <Youtube className={"m-2"} />
            </div>
          </Row>
          <Row>
            <div>
              <a href={"https://www.hawaii.edu/contact/"}>Contact UH</a>
            </div>
            <div>
              If required, information contained on this website can be made available in an alternative format upon
              request.
            </div>
            <div>
              <a href={"https://get.adobe.com/reader/"}>Get Adobe Acrobat Reader</a>
            </div>
          </Row>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
