import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import ReportView from "./ReportView";
import { Col, Container, Row } from "react-bootstrap";
import { ReportCollection } from "../../../api/ReportCollection";

Meteor.subscribe("reports");

const ReportsPage = () => {
  // Reactive data for the reports database
  const reports = useTracker(() => ReportCollection.find({}).fetch());

  return (
    <Container>
      <Col>
        {reports.length === 0 ? (
          <Row>
            <h1 className={"text-center"}>No Reports in Database</h1>
          </Row>
        ) : (
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
        )}

        {reports.map((report, index) => (
          <ReportView key={report._id} index={index} report={report} />
        ))}
      </Col>
    </Container>
  );
};

export default ReportsPage;
