import React, { FC } from "react";
import "../../../styles/dashboard/startDirectMessage.css";
import convo from "../../../assets/convo.svg";

interface DirectMessageProps {
  setStartMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

const DirectMessage: FC<DirectMessageProps> = ({ setStartMessage }) => {
  const closeDirectMessage = () => {
    setStartMessage(false);
  };

  const clickHandler = (e: any) => {
    if (e.target.classList[0] === "direct-container") {
      closeDirectMessage();
    }
  };

  return (
    <div className="direct-container" onClick={clickHandler}>
      <div className="direct-message">
        <button className="direct-button-close">
          <i className="fa-solid fa-xmark" onClick={closeDirectMessage}></i>
        </button>
        <div className="direct-image">
          <img src={convo} alt="two people talking"></img>
        </div>
        <h3 className="direct-title">DM someone at another company</h3>
        <h4 className="direct-description">
          Slack Connect lets you securely message anyone, no matter where they
          work. Invite someone by email and we’ll notify you as soon as they
          accept.
        </h4>
        <input
          className="direct-input"
          type="text"
          placeholder="Add an email address"
        />
        <button className="direct-button">Send Invitation</button>
      </div>
    </div>
  );
};

export default DirectMessage;
