import React, { useState } from 'react';
import { CaretDown, CaretUp, Send } from 'react-bootstrap-icons';
import UserChatMessage from './UserChatMessage';
import AiChatMessage from './AiChatMessage';

const ChatBot = () => {
  const [messages, setMessages] = useState([{sender: "hoku", text: "aloha, i am hoku, your virtual assistant!"}]);
  const [text, setText] = useState("")
  const [hokuLoading, setHokuLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const insertMessage = ({ sender, text }) => {
    setMessages(p => [...p, { sender, text }]);
  }

  const handleSend = (e) => {
    e.preventDefault()
    insertMessage({sender: "user", text: text});

    setHokuLoading(true);
    Meteor.call("askHoku", text, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        setHokuLoading(false);
        insertMessage({sender: "hoku", text: res});
      }
    });

    setText("")
  }


  return (
    <div className="chat-container m-3 d-flex flex-column rounded-3">
      <div className="d-flex justify-content-between p-3 bg-primary rounded-top-3">
        <div className="fw-bold fs-5 text-white">Hoku: Virtual Assistant</div>
        <button onClick={() => { setChatOpen(!chatOpen) }} className="chat-dropdown rounded-circle text-white">
          { <CaretDown rotate={chatOpen ? 180 : 0} /> }
        </button>
      </div>

      <div className="overflow-auto d-flex flex-column">
        {messages.map(data => data.sender === "user" ? <UserChatMessage text = { data.text }/> : <AiChatMessage text = { data.text } />)}
        {hokuLoading && <AiChatMessage loading={ hokuLoading } text = { "loading..." } />}
      </div>

      <div className="flex-grow-1"></div>
      <form className="chat-input d-flex flex-row m-2 p-1" onSubmit={handleSend}>
        <input onChange={e => {
          setText(e.target.value)
        }} value={text} type="text" placeholder="Ask Hoku" className="send-text border-1 p-1 rounded-start-2 flex-grow-1"/>
        <button type="submit" className="send-text rounded-end-2 border-1 border-start-0"><Send/></button>
      </form>
    </div>
  )
}

export default ChatBot;