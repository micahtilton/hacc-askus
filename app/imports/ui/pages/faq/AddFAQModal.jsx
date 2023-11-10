import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from 'react-toastify';

const AddFAQModal = () => {
  const [questionText, setQuestionText] = useState("");
  const [answerText, setAnswerText] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setQuestionText("");
    setAnswerText("");
    setShow(true);
  };

  const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));

  const handleSubmit = () => {
    Meteor.call("addFAQ", questionText, answerText, (err) => {
      if (err) {
        console.log(err);
        toast.error('FAQ Not Added');
      }
      else {
        toast.promise(
          resolveAfter3Sec,
          {
            pending: 'Submitting...',
            success: 'FAQ Added Successfully',
          }
        )
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
