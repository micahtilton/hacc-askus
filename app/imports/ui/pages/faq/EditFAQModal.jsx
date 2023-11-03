import React, { useState } from "react";
import { FAQCollection } from "../../../api/FAQCollection";
import { Button, Form, Modal } from "react-bootstrap";

const EditFAQModal = ({ faq }) => {
  const [questionText, setQuestionText] = useState("");
  const [answerText, setAnswerText] = useState(faq.text);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setQuestionText(faq.question);
    setAnswerText(faq.text);
    setShow(true);
  };

  const handleSubmit = () => {
    handleClose();
    Meteor.call("editFAQ", faq._id, questionText, answerText, (err) => {
      if (err) {
        console.log(err);
      }
    });
  };

  const handleDelete = () => {
    handleClose();
    Meteor.call("removeFAQ", faq._id);
  };

  return (
    <>
      <div>
        <Button onClick={handleShow}>Edit</Button>
      </div>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update FAQ</Modal.Title>
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
                as="textarea"
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
          <Button variant="danger" onClick={handleDelete}>
            Delete
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
