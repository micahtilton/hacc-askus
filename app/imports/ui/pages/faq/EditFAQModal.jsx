import React, { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const EditFAQModal = ({ faq }) => {
  const [questionText, setQuestionText] = useState("");
  const [answerText, setAnswerText] = useState(faq.text);

  const [show, setShow] = useState(false);

  // Function to close the modal.
  const handleClose = () => setShow(false);

  // Function to show the modal and set question and answer text based on the 'faq' prop.
  const handleShow = () => {
    setQuestionText(faq.question);
    setAnswerText(faq.text);
    setShow(true);
  };

  // Function to handle form submission for editing an FAQ.
  const handleSubmit = () => {
    if (questionText.trim() === "" || answerText.trim() === "") {
      return;
    }
    // Close the modal.
    handleClose();

    // Call the 'editFAQ' method on the server with FAQ id, question and answer text.
    Meteor.call("editFAQ", faq._id, questionText, answerText, (err) => {
      if (err) {
        toast.error("Could not update FAQ");
      } else {
        toast.success("FAQ Updated");
      }
    });
  };

  // Function to handle deleting an FAQ.
  const handleDelete = () => {
    handleClose();
    Meteor.call("removeFAQ", faq._id);
    toast.success("FAQ Deleted");
  };

  return (
    <>
      <div className={"d-flex flex-column justify-content-center"}>
        <Button className={"btn-vibrant-primary"} onClick={handleShow}>
          Edit
        </Button>
      </div>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Faq</Modal.Title>
        </Modal.Header>
        <Modal.Body className={"overflow-y-auto"}>
          <Form
            id={"edit-faq-form"}
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
                  as="textarea"
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
          <Button className={"me-auto"} variant="danger" onClick={handleDelete}>
            Delete FAQ
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" form="edit-faq-form" variant="primary">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditFAQModal;
