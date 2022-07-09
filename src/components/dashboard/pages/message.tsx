import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/dashboard/message.css";

const Message: React.FC = () => {
  return (
    <Link to="messages" className="messages">
      Message
    </Link>
  );
};

export default Message;
