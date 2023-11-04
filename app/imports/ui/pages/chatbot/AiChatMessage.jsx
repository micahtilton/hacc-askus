import React, { useState } from "react";
import { ExclamationCircle } from "react-bootstrap-icons";
import ReportModal from "../report/ReportModal";
import { Image } from "react-bootstrap";

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
    Meteor.call("addReport", data, (err) => {
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
    <div className={"d-flex align-items-end"}>
      <Image
        src={"images/hoku-pfp.png"}
        width={40}
        height={40}
        className={"mx-2"}
      />
      <div className="ai-text-box align-self-start d-flex p-2 justify-content-start bg-primary text-white text-break me-lg-5 me-sm-2">
        {loading ? (
          <ChatLoading />
        ) : (
          <div className={"d-flex"}>
            <div>{context.answer}</div>
            <div className={"d-flex"}>
              <ExclamationCircle
                className={"ms-2"}
                onClick={() => setShow(true)}
              />
            </div>
            <ReportModal
              context={context}
              show={show}
              handleClose={handleClose}
              onSubmit={onSubmit}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AiChatMessage;
