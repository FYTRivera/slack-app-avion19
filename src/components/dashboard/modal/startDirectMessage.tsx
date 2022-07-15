import React, {
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "../../../styles/dashboard/startDirectMessage.css";
import convo from "../../../assets/convo.svg";
import { Auth } from "../../../App";
import { getUsers } from "../../../utils/dataFetching";

interface DirectMessageProps {
  setStartMessage: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedUser: React.Dispatch<React.SetStateAction<any[]>>;
}

const DirectMessage: FC<DirectMessageProps> = ({
  setStartMessage,
  setSelectedUser,
}) => {
  const { headerData, signInData } = useContext(Auth);

  const [recipientEmail, setRecipientEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredArray, setFilteredArray] = useState([{ email: "", id: "" }]);
  const [isTyping, setIsTyping] = useState(false);
  const selectBox = useRef(null);
  const inputBox = useRef(null);
  const buttonBox = useRef(null);

  async function handleGetUsers() {
    try {
      const fetch = await getUsers(headerData);

      if (fetch.data) {
        setUsers(fetch.data);
        setFilteredArray(
          users.filter((user) => user.uid.includes(recipientEmail))
        );
      } else if (!fetch.success) {
        setFilteredArray([]);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    handleGetUsers();
  }, [recipientEmail]);

  function selectHandler(e: any) {
    const index = e.target.getAttribute("data-index");

    inputBox.current.value = filteredArray[index].email;
    setSelectedUser((prevData) => [...prevData, filteredArray[index]]);
    setIsTyping(false);
  }

  function sendInvitationHandler() {
    closeDirectMessage();
  }

  const closeDirectMessage = () => {
    setStartMessage(false);
  };

  const clickHandler = (e: any) => {
    if (e.target.classList[0] === "direct-container") {
      closeDirectMessage();
    }
  };

  const onChangeHandler = (e: any) => {
    setIsTyping(false);

    console.log(filteredArray);

    if (e.target.value === "") {
      setIsTyping(false);
    } else {
      // setTimeout(() => {
        setRecipientEmail(e.target.value);
        setIsTyping(true);
      // }, 200);
    }
  };

  function DisplaySearchedEmail() {
    if (filteredArray.length !== 0) {
      return (
        <div className="email-dropdown">
          {filteredArray.map((user, index) => (
            <div
              className="email"
              key={user.id}
              data-index={index}
              onClick={selectHandler}
            >
              <i className="fa-solid fa-user"></i>
              <div className="user-email">{user.email}</div>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="email-dropdown" ref={selectBox}>
          <div className="email">
            <div>No user found</div>
          </div>
        </div>
      );
    }
  }

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
          onChange={onChangeHandler}
          ref={inputBox}
        />
        {isTyping ? <DisplaySearchedEmail /> : ""}
        <button
          className="direct-button"
          ref={buttonBox}
          onClick={sendInvitationHandler}
        >
          Send Invitation
        </button>
      </div>
    </div>
  );
};

export default DirectMessage;
