import React, { useState } from "react";
import { CaretDown, Send } from "react-bootstrap-icons";
import UserChatMessage from "./UserChatMessage";
import AiChatMessage from "./AiChatMessage";
import { Button, Form } from "react-bootstrap";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);

  const [text, setText] = useState("");
  const [hokuLoading, setHokuLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const insertMessage = (message) => {
    setMessages((p) => [...p, message]);
  };

  const handleSend = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    insertMessage({ sender: "user", text: text });

    setHokuLoading(true);

    Meteor.call("askHoku", text, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        setHokuLoading(false);
        insertMessage({ sender: "hoku", context: res });
      }
    });

    setText("");
  };

  return (
    <div className="chat-container m-3 d-flex flex-column rounded-3">
      <div className="d-flex justify-content-between ps-2 p-1 bg-primary rounded-3 mb-2">
        <div className="fw-medium fs-5 text-white">Hoku: Virtual Assistant</div>
        <button
          onClick={() => {
            setChatOpen(!chatOpen);
          }}
          className="chat-dropdown rounded-circle text-white"
        >
          {<CaretDown rotate={chatOpen ? 180 : 0} />}
        </button>
      </div>

      <div className="overflow-auto flex-grow-1 bg-white rounded-top-3 shadow-lg">
        <div className="d-flex flex-column">
          {messages.map((data, i) =>
            data.sender === "user" ? (
              <UserChatMessage key={i} text={data.text} />
            ) : (
              <AiChatMessage key={i} context={data.context} />
            ),
          )}
          {hokuLoading && (
            <AiChatMessage loading={hokuLoading} text={"loading..."} />
          )}
        </div>

        <div className="flex-grow-1"></div>
      </div>

      <Form
        className="d-flex flex-row bg-white rounded-bottom-3"
        onSubmit={handleSend}
      >
        <Form.Control
          type={"text"}
          className={"m-1 p-1 fw-light"}
          placeholder={"Ask Hoku"}
          onChange={(e) => {
            if (e.target.value.length > 120) {
              return;
            }
            setText(e.target.value);
          }}
          value={text}
        ></Form.Control>
        <Form.Group>
          <Button type={"submit"} className={"m-1 rounded-circle"}>
            <Send />
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default ChatBot;
