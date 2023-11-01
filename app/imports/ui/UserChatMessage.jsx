import React from "react";

const UserChatMessage = ({ text }) => (
  <div className="align-self-end d-flex justify-content-end p-2 m-2 bg-secondary-subtle rounded-4 mw-75 text-black">
    {text}
  </div>
);

export default UserChatMessage;
