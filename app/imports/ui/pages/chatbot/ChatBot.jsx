import React, { useEffect, useRef, useState } from "react";
import { ChatDotsFill, SendFill } from "react-bootstrap-icons";
import UserChatMessage from "./UserChatMessage";
import AiChatMessage from "./AiChatMessage";
import { Button, Form, Image } from "react-bootstrap";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [hokuLoading, setHokuLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(true);
  const bottomOfChat = useRef();

  const animationTag = chatOpen ? "slide-in" : "slide-out";

  useEffect(() => {
    if (bottomOfChat.current) {
      bottomOfChat.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    setHokuLoading(true);
    Meteor.call(
      "hokuRepeat",
      "Aloha, I am Hoku! I can help you answer any questions you have about ITS! If I don't give you a helpful answer, click the info button on the top right and I will try to recommend some articles for you to take a look at.",
      1000,
      (err, res) => {
        if (err) {
          setHokuLoading(false);
        } else {
          setHokuLoading(false);
          insertMessage({ sender: "hoku", context: res, reportable: false });
        }
      },
    );
  }, []);

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
        insertMessage({ sender: "hoku", context: res, reportable: true });
      }
    });

    setText("");
  };

  return (
    <div className={"chat-container bottom-right d-flex flex-column align-items-end p-3"}>
      <div className={`w-100 ${animationTag}`}>
        <div className="d-flex justify-content-between ps-2 p-2 bg-vibrant-primary rounded-top-4">
          <div className="d-flex fw-medium fs-5 m-1 text-white align-items-center">
            <Image src={"images/hoku-pfp.png"} width={50} />
            <h1 className={"ps-3 m-0"}>Ask Hoku</h1>
          </div>
        </div>

        <div className="chat-area overflow-y-auto flex-grow-1 bg-white shadow">
          <div className="d-flex flex-column">
            {messages.map((data, i) =>
              data.sender === "user" ? (
                <UserChatMessage key={i} text={data.text} />
              ) : (
                <AiChatMessage key={i} context={data.context} reportable={data.reportable} />
              ),
            )}
            {hokuLoading && <AiChatMessage loading={hokuLoading} text={"loading..."} />}
            <div ref={bottomOfChat}></div>
          </div>

          <div className="flex-grow-1"></div>
        </div>

        <Form className="d-flex flex-row bg-white rounded-bottom-4 shadow" onSubmit={handleSend}>
          <Form.Control
            type={"text"}
            className={"m-2 p-1 mt-3 fw-light d-flex px-2 rounded-pill chat-field"}
            placeholder={"Ask Hoku"}
            onChange={(e) => {
              if (e.target.value.length > 120) {
                return;
              }
              setText(e.target.value);
            }}
            value={text}
          ></Form.Control>

          <div className={"d-flex flex-column justify-content-center pe-2"}>
            <Button size={"sm"} type={"submit"} className={"rounded-circle btn-vibrant-primary mt-2"}>
              <SendFill />
            </Button>
          </div>
        </Form>
      </div>

      <div>
        <Button
          className={"mt-2 p-2 rounded-3 btn-vibrant-primary shadow"}
          onClick={() => {
            setChatOpen(!chatOpen);
          }}
        >
          <div className={"text-white d-flex"}>
            Hoku Virtual Assistant
            <ChatDotsFill className={"ms-2 mt-1"} />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default ChatBot;
