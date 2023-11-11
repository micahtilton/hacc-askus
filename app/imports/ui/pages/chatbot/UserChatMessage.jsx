import React from "react";

const UserChatMessage = ({ text }) => (
  <div className="user-text-box align-self-end d-flex justify-content-end p-2 m-2 bg-secondary-subtle mw-75 text-black">
    {/* Display text content of user*/}
    {text}
  </div>
);

export default UserChatMessage;
