import React, { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const ResolveModal = ({ report }) => {
  // Populate questionText with the question the user asked
  const [questionText, setQuestionText] = useState(report.question);
  const [answerText, setAnswerText] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setQuestionText(report.question);
    setShow(true);
  };

  // Delete report with id and close modal
  const deleteReport = ({ _id }) => {
    Meteor.call("removeReport", _id);
    toast.success("Removed Report");
    handleClose();
  };

  const handleSubmit = () => {
    const res = {
      question: questionText,
      answer: answerText,
    };

    if (res.question.trim() === "" || res.answer.trim() === "") {
      return;
    }

    Meteor.call("resolveReport", report._id, res.question, res.answer);
    toast.success("Report Resolved");

    clearForm();
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
              handleSubmit();
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Question"
                  value={questionText}
                  isInvalid={questionText.trim() === ""}
                  onChange={(e) => {
                    setQuestionText(e.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">Question field is required</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Answer</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Answer"
                  value={answerText}
                  isInvalid={answerText.trim() === ""}
                  onChange={(e) => {
                    setAnswerText(e.target.value);
                  }}
                />
                <Form.Control.Feedback type="invalid">Answer field is required</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className={"me-auto"}
            variant="danger"
            onClick={() => {
              deleteReport(report);
            }}
          >
            Delete Report
          </Button>
          <Button form="resolve-form" type="submit" variant="primary">
            Resolve
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ResolveModal;
