import React, { useState } from "react";
import { CaretDown, Send } from "react-bootstrap-icons";
import UserChatMessage from "./UserChatMessage";
import AiChatMessage from "./AiChatMessage";
import { Button, Modal } from "react-bootstrap";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      sender: "hoku",
      text: "Aloha! I am Hoku, your virtual assistant! How can I help you?",
    },
  ]);
  const [text, setText] = useState("");
  const [hokuLoading, setHokuLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [show, setShow] = useState(false);

  const modalToggle = () => {
    setShow(true);
  };
  const insertMessage = ({ sender, text }) => {
    setMessages((p) => [...p, { sender, text }]);
  };

  const handleSend = (e) => {
    e.preventDefault();

    if (!text) return;

    insertMessage({ sender: "user", text: text });

    setHokuLoading(true);
    Meteor.call("askHoku", text, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        setHokuLoading(false);
        insertMessage({ sender: "hoku", text: res });
      }
    });

    setText("");
  };

  return (
    <>
      <div className="chat-container m-3 d-flex flex-column rounded-3 bg-white">
        <div className="d-flex justify-content-between p-3 bg-primary rounded-top-3">
          <div className="fw-bold fs-5 text-white">Hoku: Virtual Assistant</div>
          <button
            onClick={() => {
              setChatOpen(!chatOpen);
            }}
            className="chat-dropdown rounded-circle text-white"
          >
            {<CaretDown rotate={chatOpen ? 180 : 0} />}
          </button>
        </div>

        <div className="overflow-auto flex-grow-1">
          <div className="d-flex flex-column">
            {messages.map((data) =>
              data.sender === "user" ? (
                <UserChatMessage text={data.text} />
              ) : (
                <AiChatMessage text={data.text} />
              ),
            )}
            {hokuLoading && (
              <AiChatMessage
                modalToggle={modalToggle}
                loading={hokuLoading}
                text={"loading..."}
              />
            )}
          </div>

          <div className="flex-grow-1"></div>
        </div>

        <form
          className="chat-input d-flex flex-row m-2 p-1"
          onSubmit={handleSend}
        >
          <input
            onChange={(e) => {
              if (e.target.value.length > 120) {
                return;
              }
              setText(e.target.value);
            }}
            value={text}
            type="text"
            placeholder="Ask Hoku"
            className="send-text border-1 p-1 rounded-start-2 flex-grow-1"
          />
          <button
            type="submit"
            className="send-text rounded-end-2 border-1 border-start-0"
          >
            <Send />
          </button>
        </form>
      </div>

      <>
        <Modal show={show} onHide={modalToggle}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={modalToggle}>
              Close
            </Button>
            <Button variant="primary" onClick={modalToggle}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
};

export default ChatBot;
