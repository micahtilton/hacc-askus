import { Col, Row } from "react-bootstrap";
import EditFAQModal from "./EditFAQModal";
import React from "react";

const FAQRow = ({ faq, index }) => {
  const rowTag = index % 2 == 1 ? "bg-dull-light" : "";
  return (
    <Row className={`py-3 ${rowTag}`}>
      <Col>
        <div className={"fw-bold"}>Question: </div>
        <div>{faq.question}</div>
      </Col>
      <Col>
        <div className={"fw-bold"}>Answer: </div>
        <div>{faq.text}</div>
      </Col>
      <Col>
        <div className={"fw-bold"}>Source: </div>
        <div>{faq.source}</div>
      </Col>
      <Col className={"d-flex justify-content-end"}>
        <EditFAQModal faq={faq} />
      </Col>
    </Row>
  );
};

export default FAQRow;
