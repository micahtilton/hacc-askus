import React from "react";

function ChatLoading() {
  return (
    <div className="d-flex">
      <span className="dot delay-1" />
      <span className="dot delay-2" />
      <span className="dot delay-3" />
    </div>
  );
}

const AiChatMessage = ({ text, loading = false }) => (
  <div className="align-self-start d-flex justify-content-start p-2 m-2 bg-primary rounded-3 mw-75 text-white text-break">
    {loading ? <ChatLoading /> : { text }}
  </div>
);

export default AiChatMessage;
