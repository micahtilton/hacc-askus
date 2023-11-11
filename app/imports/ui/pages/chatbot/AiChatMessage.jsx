import React, { useState } from "react";
import { ExclamationCircle } from "react-bootstrap-icons";
import ReportModal from "../report/ReportModal";
import { Image } from "react-bootstrap";
import { toast } from "react-toastify";

function ChatLoading() {
  // Loading animation for chatbot
  return (
    <div className="d-flex py-1">
      <span className="dot delay-1" />
      <span className="dot delay-2" />
      <span className="dot delay-3" />
    </div>
  );
}

const AiChatMessage = ({ context, loading = false, reportable = true }) => {
  // Use the useState hook to manage the state of the 'show' variable
  const [show, setShow] = useState(false);

  const onSubmit = (data) => {
    // Use the Meteor.call method to call the 'addReport' method on the server
    Meteor.call("addReport", data, (err) => {
      if (err) {
        // Report could not be added.
        toast.error("Report could not send");
      } else {
        // Report was added.
        toast.success("Report Sent");
      }
    });
  };

  // Function to close Modal
  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className={"d-flex align-items-end my-1"}>
      <Image src={"images/hoku-pfp.png"} width={40} height={40} className={"ms-2"} alt={"Hoku Picture"} />
      <div className="ai-text-box align-self-start d-flex p-2 justify-content-start bg-vibrant-primary text-white text-break me-lg-5 m-2">
        {/* Check if the chat is loading, display loading animation */}
        {loading ? (
          <ChatLoading />
        ) : (
          <div className={"d-flex px-1"}>
            {/* Display the AI response */}
            <div>{context.answer}</div>
            <ReportModal context={context} show={show} handleClose={handleClose} onSubmit={onSubmit} />
            {/* Check if the message is reportable; if true, render an exclamation icon for reporting */}
            {reportable && (
              <div className={"d-flex"}>
                <ExclamationCircle className={"ms-2"} onClick={() => setShow(true)} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AiChatMessage;
