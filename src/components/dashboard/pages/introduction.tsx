import { FC } from "react";
import "../../../styles/dashboard/introduction.css";
import intro from "../../../assets/intro.svg";

interface introPROPS {
  setOnModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Introduction: FC<introPROPS> = ({ setOnModal }) => {
  const clickHandler = () => {
    setOnModal(true);
  };

  return (
    <div className="dashboard-intro">
      <div className="introduction">Slack Connect</div>
      <div className="introduction-description">
        <div>
          <h1>Work and connect with people outside User in Slack</h1>
          <h3>
            Use Slack Connect to collaborate securely with clients, vendors and
            partners.
          </h3>
        </div>
        <img src={intro}></img>
      </div>
      <div className="intro-buttons">
        <h2>How do you want to work together?</h2>
        <div className="buttons">
          <button className="start-message">
            <i className="fa-solid fa-pen-to-square"></i> Start a direct message
          </button>
          <button className="create-channel" onClick={clickHandler}>
            <i className="fa-solid fa-plus"></i> Create a channel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
