import React from "react";
import { Col, Row } from "react-bootstrap";
import ContextModal from "./ContextModal";
import ResolveModal from "./ResolveModal";

const formatDate = (date) => {
  return date.toLocaleString("en-US");
}

const ReportView = ({ report, index }) => {
  const bgTag = index % 2 === 0 ? "bg-dark-subtle" : "";

  return (
    <>

      <Row className={`py-2 ${bgTag}`}>
        <Col md={1}>
          <span className={"fw-bold d-md-none"}>Comment: </span>
          <span>{report.comment}</span>
          <Col>{report.date.toLocaleString("en-US")}</Col>
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
        <Col md={1} className={""}>
          <ResolveModal report={report} />
        </Col>
      </Row>
      <Row className={`py-2 ${bgTag}`}>

      </Row>
    </>
  );
};

export default ReportView;
