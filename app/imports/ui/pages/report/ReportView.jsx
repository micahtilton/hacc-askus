import React from "react";
import { Col, Row } from "react-bootstrap";
import ContextModal from "./ContextModal";
import ResolveModal from "./ResolveModal";

const ReportView = ({ report, index }) => {
  // Alternate between light and dark, for the report row
  const bgTag = index % 2 === 0 ? "bg-dull-light" : "";

  return (
    <>
      <Row className={`py-2 rounded-3 ${bgTag}`}>
        <Col md={1}>
          <span className={"fw-bold d-md-none"}>Comment: </span>
          <span>{report.comment}</span>
          <Col className={"text-black-50"}>{report.date.toLocaleString("en-US")}</Col>
        </Col>
        <Col md={2}>
          <span className={"fw-bold d-md-none"}>Question: </span>
          <span>{report.question}</span>
        </Col>
        <Col md={4}>
          <span className={"fw-bold d-md-none"}>Answer: </span>
          <span>{report.answer}</span>
        </Col>
        <Col md={2}>
          <span className={"fw-bold d-md-none"}>Tags: </span>
          <ul>
            {report.categories.map((category, i) => (
              <li key={i}>{category}</li>
            ))}
          </ul>
        </Col>
        <Col md={2}>
          <span className={"fw-bold d-md-none"}>Sources: </span>
          <ul>
            {report.context.map((c, i) => (
              <ContextModal key={i} context={c} />
            ))}
          </ul>
        </Col>
        <Col md={1}>
          <ResolveModal report={report} />
        </Col>
      </Row>
    </>
  );
};

export default ReportView;
