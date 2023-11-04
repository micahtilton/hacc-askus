import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { ExclamationCircle } from "react-bootstrap-icons";
import ReportModal from "../components/ReportModal";

function ChatLoading() {
  return (
    <div className="d-flex">
      <span className="dot delay-1" />
      <span className="dot delay-2" />
      <span className="dot delay-3" />
    </div>
  );
}
const WelcomeMessage = (text, loading) => {
  const [show, setShow] = useState(false);

  return (
    <div className={"d-flex align-items-end"}>
      <Image src={"hoku-pfp.png"} width={40} height={40} className={"mx-2"} />
      <div className="ai-text-box align-self-start d-flex p-2 justify-content-start bg-primary text-white text-break me-lg-5 me-sm-2">
        {loading ? (
          <ChatLoading />
        ) : (
          <div className={"d-flex"}>
            {/*<Typewriter text={context.answer} />*/}
            <div>{context.answer}</div>
            <div className={"d-flex"}>
              <ExclamationCircle className={"ms-2"} onClick={() => setShow(true)} />
            </div>
            <ReportModal context={context} show={show} handleClose={handleClose} onSubmit={onSubmit} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeMessage;
