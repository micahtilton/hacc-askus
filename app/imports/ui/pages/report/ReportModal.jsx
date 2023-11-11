import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const reportTypes = [
  "Inaccurate Information",
  "Offensive or Inappropriate Content",
  "Inadequate Responses",
  "Privacy Concerns",
];

const ReportModal = ({ context, show, handleClose, onSubmit }) => {
  const [reportDetails, setReportDetails] = useState({
    categories: new Set([]),
    comment: "",
  });

  const clearForm = () => {
    setReportDetails({
      categories: new Set([]),
      comment: "",
    });
  };

  // Uses a set to keep track of selected items
  const toggleReportType = (reportType, checked) => {
    const copy = { ...reportDetails };
    if (checked) {
      copy.categories.add(reportType);
    } else {
      copy.categories.delete(reportType);
    }
    setReportDetails(copy);
  };

  const handleSubmit = () => {
    // Create the full report from form
    const fullReport = {
      resolved: false,
      ...reportDetails,
      ...context,
      date: new Date(),
    };

    // Turn set into an array
    fullReport.categories = Array.from(fullReport.categories);

    // Replace empty comment with "No Comment Provided"
    if (fullReport.comment.trim() === "") {
      fullReport.comment = "No Comment Provided";
    }

    // Use the onSubmit callback passed in by props
    onSubmit(fullReport);
    clearForm();
    handleClose();
  };

  // Store all non emails in links array
  const links = [];
  for (let c of context.context) {
    if (!c.source.includes("@") && c.similarity > 0.81) {
      links.push(c.source);
    }
  }

  // Handle modal close
  const close = () => {
    clearForm();
    handleClose();
  };

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{links.length !== 0 ? "Can't find what you are looking for?" : "Report"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {links.length !== 0 && (
          <>
            <h5>Try reading these articles</h5>
            {links.map((link, index) => (
              <div key={index}>
                <a href={link} target="_blank">
                  {link}
                </a>
              </div>
            ))}
            <h5 className={"mt-3"}>Inaccurate Information? Report it here</h5>
          </>
        )}
        <Form
          id={"report-form"}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {reportTypes.map((reportType) => (
            <Form.Check
              checked={reportDetails.categories.has(reportType)}
              onChange={(e) => {
                toggleReportType(reportType, e.target.checked);
              }}
              key={reportType}
              type={"checkbox"}
              label={reportType}
            />
          ))}
          <Form.Control
            className={"mt-3"}
            placeholder={"Additional Comments"}
            as="textarea"
            value={reportDetails.comment}
            onChange={(e) => {
              const copy = { ...reportDetails };
              copy.comment = e.target.value;
              setReportDetails(copy);
            }}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
        <Button form={"report-form"} type={"submit"} variant="danger">
          Report
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReportModal;
