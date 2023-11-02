import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { ReportCollection } from "../../api/ReportCollection";

const ResolveModal = ({ report }) => {
  const [questionText, setQuestionText] = useState(report.question);
  const [answerText, setAnswerText] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setQuestionText(report.question);
    setShow(true);
  };
  const deleteReport = ({ _id }) => {
    ReportCollection.remove(_id);
    handleClose();
  };

  const clearForm = () => {
    setAnswerText("");
  };

  return (
    <>
      <Button className={"me-5"} size={"sm"} onClick={handleShow}>
        Resolve
      </Button>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Resolve</Modal.Title>
        </Modal.Header>
        <Modal.Body className={"overflow-y-auto"}>
          <Form
            id={"resolve-form"}
            onSubmit={(e) => {
              e.preventDefault();

              const res = {
                question: questionText,
                answer: answerText,
              };
              console.log(res);

              clearForm();
              handleClose();
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                placeholder="Question"
                value={questionText}
                onChange={(e) => {
                  setQuestionText(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Answer</Form.Label>
              <Form.Control
                type="text"
                placeholder="Answer"
                value={answerText}
                onChange={(e) => {
                  setAnswerText(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              deleteReport(report);
            }}
          >
            Delete
          </Button>
          <Button form={"resolve-form"} type={"submit"} variant="primary">
            Resolve
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const ContextModal = ({ context }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <li>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleShow();
          }}
        >
          {context.source}
        </a>
      </li>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Context</Modal.Title>
        </Modal.Header>
        <Modal.Body className={"overflow-y-auto"}>
          <span className={"fw-bold"}>Similarity:</span>
          <span className={"ps-2"}>{context.similarity}</span>

          <div className={"fw-bold"}>AI Context: </div>
          <div>{context.text}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const ReportView = ({ report, index }) => {
  const bgTag = index % 2 === 0 ? "bg-dark-subtle" : "";

  return (
    <>
      <Row className={`py-2 ${bgTag}`}>
        <Col md={1}>
          <span className={"fw-bold d-md-none"}>Comment: </span>
          <span>{report.comment}</span>
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
    </>
  );
};

export default ReportView;
