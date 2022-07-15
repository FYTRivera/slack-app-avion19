import "../../../styles/dashboard/message.css";
import { useState, useEffect, useRef, FC, useContext } from "react";
import "../../../styles/dashboard/message.css";
import { Auth } from "../../../App";
import {
  getUsers,
  receiveMessageAPI,
  sendMessageAPI,
} from "../../../utils/dataFetching";

//////ACCOUNT DETAILS//////

//MAKI's account
// id: 2242,
// email: 'junmark123@chi.com',
// provider: 'email',
// uid: 'junmark123@chi.com'

// FRANCO's account
// id: 2243,
// email: 'franco123@rivera.com',
// provider: 'email',
// uid: 'franco123@rivera.com'

//////ACCOUNT DETAILS//////

interface messageProp {
  signInData: {
    id?: number;
  };
}

const DirectMessages: FC<messageProp> = (props) => {
  const { signInData } = props;
  const userData = useContext(Auth);

  console.log(userData);

  const [directMessage, setDirectMessage] = useState({
    receiver: window.localStorage.getItem("lastAccount") || 2243,
    receiver_class: "User",
    body: "",
  });

  window.localStorage.setItem("lastAccount", directMessage.receiver.toString());

  const [receivedMessages, setReceivedMessages] = useState([]);

  const [isMessaged, setIsMessaged] = useState(false);

  const [error, setError] = useState("");

  const [users, setUsers] = useState([]);

  const [filteredArray, setFilteredArray] = useState([{ uid: "", id: "" }]);

  const [recipientUID, setRecipientUID] = useState("");

  const selectBox = useRef(null);

  const [selectedUser, setSelectedUser] = useState(0);

  async function handleMessageSend(e: any) {
    e.preventDefault();
    try {
      const fetch = await sendMessageAPI(userData, directMessage);

      if (fetch.data) {
        setDirectMessage({ ...directMessage, body: "" });
        setError("");
        isMessaged ? setIsMessaged(false) : setIsMessaged(true);
      } else if (!fetch.success) {
        setError(fetch.errors);
      }
    } catch {}
  }

  //////////////////////////////////////////////RECEIVED MESSAGES////////////////////////////////////////////////

  async function handleMessageReceive() {
    try {
      const fetch = await receiveMessageAPI(userData, directMessage);

      if (fetch.data) {
        setReceivedMessages(fetch.data);
        setError("");
      } else if (!fetch.success) {
        setReceivedMessages([]);
        setError(fetch.errors);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    handleMessageReceive();
  }, [directMessage.receiver, isMessaged]);

  setTimeout(handleMessageReceive, 1000);
  /////////////////////////////////////////RECEIVED MESSAGES//////////////////////////////////////////////
  /////////////////////////////////////////GET USERS/////////////////////////////////////////////////////

  async function handleGetUsers() {
    try {
      const fetch = await getUsers(userData);

      if (fetch.data) {
        console.log(fetch.data);
        setUsers(fetch.data);
        setError("");
        setFilteredArray(
          users.filter((user) => user.uid.includes(recipientUID))
        );
        console.log(filteredArray, "filtered array");
      } else if (!fetch.success) {
        setReceivedMessages([]);
        setError(fetch.errors);
        setFilteredArray([]);
      }
    } catch (e) {
      console.error(e);
    }
  }
  // useEffect(()=>{handleGetUsers()},[users]);

  useEffect(() => {
    handleGetUsers();
  }, [recipientUID]);

  function handleSelectChange() {
    if (selectBox.current !== undefined) {
      console.log(
        selectBox.current.options[selectBox.current.options.selectedIndex]
          .innerHTML
      );
      console.log(
        filteredArray[selectBox.current.options.selectedIndex - 1].id
      );
      setSelectedUser(
        Number(filteredArray[selectBox.current.options.selectedIndex - 1].id)
      );
      setDirectMessage({
        ...directMessage,
        receiver: Number(
          filteredArray[selectBox.current.options.selectedIndex - 1].id
        ),
      });
    }
  }
  ////////////////////////////////////////GET USERS///////////////////////////////////////////////////////

  return (
    <div className="messages-div">
      <div className="top-message-div">
        <label>Search: </label>
        <input
          value={recipientUID}
          type="text"
          placeholder="UID of Recipient"
          className="contact-id-input"
          onChange={(e: any) => setRecipientUID(e.target.value)}
        ></input>
        <div>
          <label>UIDs: </label>
          <select ref={selectBox} onChange={handleSelectChange}>
            <option> Click here to see users! </option>
            {recipientUID !== "" ? (
              filteredArray.map((user) => (
                <>
                  <option>
                    {user.uid} | {user.id}
                  </option>
                </>
              ))
            ) : (
              <p>nothing</p>
            )}
          </select>
        </div>
        {selectedUser !== 0 ? (
          <h2>User #{selectedUser}</h2>
        ) : (
          <h2>Select a User</h2>
        )}
        <h2>User UID: {selectedUser}</h2>
      </div>

      <div className="message-text">
        <ul>
          {receivedMessages.map((message, index) =>
            message.sender.id == directMessage.receiver ? (
              <div className="received">
                <div className="name-date">
                  <h5 className="recipient-user">
                    User #{directMessage.receiver}
                  </h5>
                  <h6 className="received-date-and-time">
                    {message.created_at}
                  </h6>
                </div>
                <div key={index} className="received-message">
                  {message.body}
                </div>
                <h6 className="status">Received</h6>
              </div>
            ) : (
              <div className="sent">
                <div className="name-date">
                  <h6 className="sent-date-and-time">{message.created_at}</h6>
                  <h5 className="sender-user">User #{signInData.id}</h5>
                </div>
                <div key={index} className="sent-message">
                  {message.body}
                </div>
                <h6 className="status">Sent</h6>
              </div>
            )
          )}
        </ul>
      </div>

      <div className="bottom-div">
        {error !== "" ? (
          <div className="direct-error">
            <p>{error}</p>
          </div>
        ) : (
          <p>{error}</p>
        )}
        <div className="send-message-div">
          <textarea
            placeholder="Message"
            className="message-box-input"
            value={directMessage.body}
            onChange={(e: any) =>
              setDirectMessage({ ...directMessage, body: e.target.value })
            }
          ></textarea>
          <button className="send-button" onClick={handleMessageSend}>
            <i className="fa-solid fa-greater-than"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DirectMessages;
