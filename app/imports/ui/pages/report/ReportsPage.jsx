import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import ReportView from "./ReportView";
import { Col, Container, Row } from "react-bootstrap";
import { ReportCollection } from "../../../api/ReportCollection";

Meteor.subscribe("reports");

const ReportsPage = () => {
  const reports = useTracker(() => ReportCollection.find({}).fetch());

  return (
    <Container fluid>
      <Col className={""}>
        <Row className={"d-none d-md-flex"}>
          <Col md={1} className={"fw-bold"}>
            Comment
          </Col>
          <Col md={2} className={"fw-bold"}>
            Question
          </Col>
          <Col md={4} className={"fw-bold"}>
            Answer
          </Col>
          <Col md={2} className={"fw-bold"}>
            Tags
          </Col>
          <Col md={2} className={"fw-bold"}>
            Sources
          </Col>
        </Row>
        {reports.map((report, index) => (
          <ReportView key={report._id} index={index} report={report} />
        ))}
      </Col>
      <Col md={1}></Col>
    </Container>
  );
};

export default ReportsPage;
