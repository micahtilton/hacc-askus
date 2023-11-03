import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

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

export default ContextModal;
