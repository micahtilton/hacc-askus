import React, { useState } from "react";
import { ExclamationCircle } from "react-bootstrap-icons";
import ReportModal from "./components/ReportModal";
import { ReportCollection } from "../api/collections/ReportCollection";

function ChatLoading() {
  return (
    <div className="d-flex">
      <span className="dot delay-1" />
      <span className="dot delay-2" />
      <span className="dot delay-3" />
    </div>
  );
}

const AiChatMessage = ({ context, loading = false }) => {
  const [show, setShow] = useState(false);
  const onSubmit = (data) => {
    Meteor.call("insertReport", data, (err, res) => {
      if (err) {
        console.log("could not report message");
      } else {
        console.log("successfully inserted report");
      }
    });
  };
  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className="align-self-start d-flex justify-content-start p-2 m-2 bg-primary rounded-3 mw-75 text-white text-break">
      {loading ? (
        <ChatLoading />
      ) : (
        <>
          <div>{context.answer}</div>
          <div>
            <ExclamationCircle
              className={"mx-1"}
              onClick={() => setShow(true)}
            />
          </div>
          <ReportModal
            context={context}
            show={show}
            handleClose={handleClose}
            onSubmit={onSubmit}
          />
        </>
      )}
    </div>
  );
};

export default AiChatMessage;
