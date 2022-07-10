import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../../../styles/dashboard/sidebar.css";

const Sidebar: React.FC = () => {
  const channelList = useRef(null);
  const inputChecked = useRef(null);
  const [chHeight, setChHeight] = useState("");

  const onLogOut = () => {
    localStorage.setItem("isLoggedIn", JSON.stringify(false));
    window.location.reload();
  };

  const channelHandler = () => {
    if (channelList.current.clientHeight == 0) {
      setChHeight("100px");
      channelList.current.style.height = chHeight;
    } else {
      setChHeight("0px");
      channelList.current.style.height = chHeight;
    }
  };

  return (
    <div className="sidebar">
      <div className="title">Avion School</div>
      <div className="options">
        <div className="threads">
          <i className="fa-regular fa-comment-dots"></i>Threads
        </div>
        <div className="direct-message">
          <i className="fa-regular fa-comments"></i>Direct messages
        </div>
        <div className="mentions">
          <i className="fa-solid fa-at"></i>Mentions & reactions
        </div>
        <div className="more">
          <i className="fa-solid fa-ellipsis-vertical"></i>More
        </div>
      </div>
      <div className="channels">
        <label
          htmlFor="channels"
          className="label-channel"
          onClick={channelHandler}
        >
          <input type="checkbox" name="channels" id="channels" />
          <i className="fa-solid fa-caret-down"></i>
          <span className="channel">Channels</span>
          <span className="add-channel">
            <i className="fa-solid fa-plus"></i>
          </span>
        </label>
        <div className="channel-list" ref={channelList}>
          <Link to="allchannels" className="browse-channels">
            <i className="fa-solid fa-square-plus"></i>Browse channels
          </Link>
        </div>
      </div>
      <div className="direct-message"></div>

      <Link to="/signin" onClick={onLogOut} className="logout">
        Log Out
      </Link>
    </div>
  );
};

export default Sidebar;
