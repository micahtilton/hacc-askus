import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const AddFAQModal = () => {
  const [questionText, setQuestionText] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [show, setShow] = useState(false);

  // Function to close the FAQ modal.
  const handleClose = () => setShow(false);

  // Function to show the FAQ modal and reset question and answer text.
  const handleShow = () => {
    setQuestionText("");
    setAnswerText("");
    setShow(true);
  };

  // Function to handle FAQ submission.
  const handleSubmit = () => {
    // Call the 'addFAQ' method on the server with question and answer text.
    Meteor.call("addFAQ", questionText, answerText, (err) => {
      if (err) {
        toast.error("FAQ Not Added");
      } else {
        toast.success("FAQ Added");
      }
    });

    handleClose();
  };

  return (
    <>
      <Button className={"btn-vibrant-primary"} onClick={handleShow}>
        Add FAQ
      </Button>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Faq</Modal.Title>
        </Modal.Header>
        <Modal.Body className={"overflow-y-auto"}>
          <Form
            id={"add-faq-form"}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" form="add-faq-form" variant="primary">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddFAQModal;
