import React from "react";
import { createRoot } from "react-dom/client";
import { Meteor } from "meteor/meteor";
import "bootstrap/dist/css/bootstrap.css";
import "./main.css";
import { App } from "../imports/ui/layout/App";
import ChatBot from "../imports/ui/pages/chatbot/ChatBot";

Meteor.startup(() => {
  const container = document.getElementById("react-target");
  const root = createRoot(container);

  root.render(
    <>
      <App />
      <ChatBot />
    </>,
  );
});
