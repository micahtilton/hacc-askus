import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ReportCollection } from "../../api/ReportCollection";

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

  const close = () => {
    clearForm();
    handleClose();
  };

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Report AI Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          id={"report-form"}
          onSubmit={(e) => {
            e.preventDefault();
            const fullReport = {
              resolved: false,
              ...reportDetails,
              ...context,
              date: new Date(),
            };
            fullReport.categories = Array.from(fullReport.categories);
            onSubmit(fullReport);
            clearForm();
          }}
        >
          {reportTypes.map((reportType) => (
            <Form.Check
              checked={reportDetails.categories.has(reportType)}
              onChange={(e) => {
                const copy = { ...reportDetails };
                if (e.target.checked) {
                  copy.categories.add(reportType);
                } else {
                  copy.categories.delete(reportType);
                }
                setReportDetails(copy);
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
