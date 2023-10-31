import React from 'react';
import {ExclamationCircle} from "react-bootstrap-icons";

const AiChatMessage = ({ text, modalToggle, loading=false}) => (
  <div className="align-self-start d-flex justify-content-start p-2 m-2 bg-primary rounded-3 mw-75 text-white text-break">
    { loading ?
      <div className="d-flex">
        <span className="dot delay-1"/>
        <span className="dot delay-2"/>
        <span className="dot delay-3"/>
      </div> : <><div>{text}</div><div><a className={"ms-2"} href={"#"} onClick={() => {console.log(modalToggle)}}><ExclamationCircle className={"text-white"}/></a></div></> }
  </div>
)

export default AiChatMessage