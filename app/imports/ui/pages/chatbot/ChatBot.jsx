import React, { useEffect, useRef, useState } from "react";
import { ChatDotsFill, ChatRightDotsFill, SendFill } from "react-bootstrap-icons";
import UserChatMessage from "./UserChatMessage";
import AiChatMessage from "./AiChatMessage";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [hokuLoading, setHokuLoading, introHoku] = useState(false);
  const [chatOpen, setChatOpen,] = useState(false);
  const bottomOfChat = useRef();
  const [welcomeOpen, setWelcomeOpen,] = useState(true);

  useEffect(() => {
    if (bottomOfChat.current) {
      bottomOfChat.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  //ASk about set messages
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
    <Container fluid className="chat-container bottom-right d-flex flex-column rounded-3 mb-3">
      <Row>
        <Col sm={12} md={{ span: 8, offset: 4 }} lg={{ span: 6, offset: 6 }}>
          {chatOpen && (
            <div className="shadow-lg rounded-3">
              <div className=" d-flex justify-content-between ps-2 p-2 bg-vibrant-primary rounded-top-3">
                <div className="d-flex fw-medium fs-5 m-1 text-white align-items-center">
                  <Image src={"images/hoku-pfp.png"} width={50} />
                  <h1 className={"ps-3 m-0"}>Hoku</h1>
                </div>
              </div>

              <div className="chat-area overflow-y-auto flex-grow-1 bg-white">
                <div className="d-flex flex-column">
                  {messages.map((data, i) =>
                    data.sender === "user" ? (
                      <UserChatMessage key={i} text={data.text} />
                    ) : (
                      <AiChatMessage key={i} context={data.context} />
                    ),
                  )}
                  {introHoku && <AiChatMessage loading={hokuLoading} intro={handleIntro} />}
                  {hokuLoading && <AiChatMessage loading={hokuLoading} text={"loading..."} />}
                  <div ref={bottomOfChat}></div>
                </div>

                <div className="flex-grow-1"></div>
              </div>

              <Form className="d-flex flex-row bg-white rounded-bottom-3" onSubmit={handleSend}>
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
          )}
        </Col>
      </Row>


      <div className={"d-flex flex-column"}>
        <div className={"d-flex justify-content-end align-items-center"}>{welcomeOpen && <div className="welcome bg-white">
          <div className={"rounded-top-2 bg-primary text-white h-25 p-3"}>
            <div className={"row p-0"}>
              <div className={"w-auto"}>May I help you?</div>
              <div type="button" className="btn-close justify-content-end" aria-label="Close" onClick={() => {
                setWelcomeOpen(false);
              }}>
              </div>
            </div>
          </div>
          <p className={"p-3"}>Hi, I am Hoku! Click on the message icon if you need any assistance.</p>
        </div>}</div>
        <div className={"d-flex justify-content-end align-items-center"}>
          <Button
            className={"d-flex mt-2 p-2 btn-vibrant-primary shadow-lg rounded-3"}
            onClick={() => {
              setChatOpen(!chatOpen);
              setWelcomeOpen(false);
            }}
          >
            <div className={"text-white d-flex"}>
              <ChatRightDotsFill className={"mt-2"}/>
              <div className={"p-1"}>Questions? Ask Hoku</div>
            </div>
          </Button>
        </div>
      </div>
    </Container>
);
};

export default ChatBot;
