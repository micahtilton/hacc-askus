import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  BuildingFill,
  ChatDotsFill,
  CheckCircleFill,
  ClipboardCheckFill,
  LaptopFill,
  Newspaper,
  Server,
} from "react-bootstrap-icons";

/* A simple static component to render some text for the landing page. */
const Home = () => (
  <Container className={"p-5"}>
    <Row className={"gx-5"}>
      <Col xs={9}>
        <Row>
          <div className={"bg-dull-light fw-bold p-2 rounded-4 fs-5"}>
            <CheckCircleFill className={"m-4 text-accent"} size={40} />
            All of our systems are currently operational
          </div>
        </Row>
        <Row className={"py-4"}>
          <Col xs={2}>
            <ClipboardCheckFill size={50} className={"m-2 text-accent"} />
          </Col>
          <Col>
            <a href={"#"}>Distance Resources</a>
            <div>Teaching and Learning Remotely, Working Remotely, Video conferencing, Software Licenses</div>
          </Col>
        </Row>
        <Row className={"py-4"}>
          <Col xs={2}>
            <ChatDotsFill size={50} className={"m-2 text-accent"} />
          </Col>
          <Col>
            <a href={"#"}>Support Tools</a>
            <div>
              Email Account Practices, Google@UH, Laulima, MyUH, Reset Password, Supported Software, UH Alert Emergency
              Notification, UH Username, Wireless Information, OVPIT/CIO procurement approval requests
            </div>
          </Col>
        </Row>
        <Row className={"py-4"}>
          <Col xs={2}>
            <Server size={50} className={"m-2 text-accent"} />
          </Col>
          <Col>
            <a href={"#"}>Servers, Data Center & Storage Services</a>
            <div>
              Cabinet Technical Specifications, Colocation Services, Data Center Services, Quick Start Guide, Resources,
              Service Expectations, VM Hosted Solutions
            </div>
          </Col>
        </Row>
        <Row className={"py-4"}>
          <Col xs={2}>
            <LaptopFill size={50} className={"m-2 text-accent"} />
          </Col>
          <Col>
            <a href={"#"}>Instructional Technologies</a>
            <div>
              Computer Labs, Distance Learning, UH Online Innovation Center, Educational Cable Access, Video
              Conferencing, Laulima
            </div>
          </Col>
        </Row>
        <Row className={"py-4"}>
          <Col xs={2}>
            <BuildingFill size={50} className={"m-2 text-accent"} />
          </Col>
          <Col>
            <a href={"#"}>Cyberinfrastructure</a>
            <div>
              Collaborative Research, Data Management, High Performance Computing Resources, Research Data Storage,
              Research Software Engineering, Research Virtual Machines
            </div>
          </Col>
        </Row>
        <Row className={"py-4"}>
          <Col xs={2}>
            <Newspaper size={50} className={"m-2 text-accent"} />
          </Col>
          <Col>
            <a href={"#"}>News & Information</a>
            <div>View the latest news and information in the Information Technology Services department.</div>
          </Col>
        </Row>
      </Col>

      <Col>
        <Row className={"my-3"}>
          <div className={"fw-bold fs-4"}>Current & Recent Outages</div>
          <a href={"#"} className={"p-3"}>
            [RESOLVED] UH Manoa Wireless Network Maintenance 11/5/2023 at 6:00pm HST to 11/6/2023 5:00am (Nov 5)
          </a>
          <a href={"#"} className={"p-3"}>
            [RESOLVED] Hardware issue in data center caused server reboots (Nov 4)
          </a>
        </Row>
        <Row className={"my-3"}>
          <div className={"fw-bold fs-4"}>Security Alerts</div>
          <a href={"#"} className={"p-3"}>
            Security Alert: Multiple security vulnerabilities in the SoftEther VPN client
          </a>
          <a href={"#"} className={"p-3"}>
            Phishing Attempt: **URGENT** Declared Major Change
          </a>
        </Row>
        <Row className={"my-3"}>
          <div className={"fw-bold fs-4"}>Scheduled Maintenance</div>
          <a href={"#"} className={"p-3"}>
            BANNER: Apply December 2023 Upgrade Bundle (Dec 2)
          </a>
          <a href={"#"} className={"p-3"}>
            Scheduled Maintenance for apply.hawaii.edu (Jan 20)
          </a>
        </Row>
        <Row className={"my-3"}>
          <div className={"fw-bold fs-4"}>General Notices</div>
          <a href={"#"} className={"p-3"}>
            Notice: End of support for macOS 11 (Big Sur)
          </a>
          <a href={"#"} className={"p-3"}>
            Notice: macOS 14 (Sonoma) advisory
          </a>
        </Row>
      </Col>
    </Row>
  </Container>
);

export default Home;
