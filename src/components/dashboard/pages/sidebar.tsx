import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/dashboard/sidebar.css";

const Sidebar: React.FC = () => {
  const onLogOut = () => {
    localStorage.setItem("isLoggedIn", JSON.stringify(false));
    window.location.reload();
  };

  return (
    <>
      <div className="sidebar">
        <div className="title"></div>
        <div className="direct-message"></div>
        <div className="channels"></div>
        <div className="direct-message"></div>
        SIDEBAR
        <Link to="/signin" onClick={onLogOut}>
          Log Out
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
