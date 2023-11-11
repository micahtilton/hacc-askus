import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Facebook, Instagram, Twitter, Youtube } from "react-bootstrap-icons";

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
              An <a href={"#"}>equal opportunity/affirmative action institution</a>
            </div>
            <div>
              Use of this site implies consent with out <a href={"#"}>Usage Policy</a> copyright © 2018{" "}
              <a href={"#"}>University of Hawaiʻi</a>
            </div>
          </Row>
        </Col>
        <Col>
          <Row>
            <div>
              <a href={"#"}>Calendar</a>
            </div>
            <div>
              <a href={"#"}>Directory</a>
            </div>
            <div>
              <a href={"#"}>Emergency Information</a>
            </div>
            <div>
              <a href={"#"}>MyUH</a>
            </div>
            <div>
              <a href={"#"}>Privacy Statement</a>
            </div>
            <div>
              <a href={"#"}>Work at UH</a>
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
              <a href={"#"}>Contact UH</a>
            </div>
            <div>
              If required, information contained on this website can be made available in an alternative format upon
              request.
            </div>
            <div>
              <a href={"#"}>Get Adobe Acrobat Reader</a>
            </div>
          </Row>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
