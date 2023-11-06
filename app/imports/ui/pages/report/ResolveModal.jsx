import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

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
    Meteor.call("removeReport", _id);
    handleClose();
  };

  const clearForm = () => {
    setAnswerText("");
  };

  return (
    <>
      <Button className={"me-5 btn-vibrant-primary border-0"} size={"sm"} onClick={handleShow}>
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

              Meteor.call("resolveReport", report._id, res.question, res.answer);

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

export default ResolveModal;
