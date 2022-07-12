import "../../../styles/dashboard/message.css";
import { useState, useEffect, useRef, FC } from "react";
import { Link } from "react-router-dom";
import "../../../styles/dashboard/message.css";

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
  token: string;
  client: string;
  expiry: string;
  uid: string;
  signInData: {
    id?: number;
  };
}

const DirectMessages: FC<messageProp> = (props) => {
  const { token, client, expiry, uid, signInData } = props;

  const [directMessage, setDirectMessage] = useState({
    receiver: window.localStorage.getItem("lastAccount") || 2243,
    receiver_class: "User",
    body: "",
  });

  window.localStorage.setItem("lastAccount", directMessage.receiver.toString());

  const [receivedMessages, setReceivedMessages] = useState([]);

  const [isMessaged, setIsMessaged] = useState(false);

  const [error, setError] = useState("");

  const sendMessageAPI = async (e: any) => {
    return (
      await fetch("http://206.189.91.54/api/v1/messages", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "access-token": token,
          client: client,
          expiry: expiry,
          uid: uid,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiver_id: directMessage.receiver,
          receiver_class: directMessage.receiver_class,
          body: directMessage.body,
        }),
      })
    ).json();
  };

  async function handleMessageSend(e: any) {
    e.preventDefault();
    try {
      const fetch = await sendMessageAPI(directMessage);

      if (fetch.data) {
        setError("");
        isMessaged ? setIsMessaged(false) : setIsMessaged(true);
      } else if (!fetch.success) {
        setError(fetch.errors);
      }
    } catch {}
  }

  //////////////////////////////////////////////RECEIVED MESSAGES////////////////////////////////////////////////
  const receiveMessageAPI = async (e: any) => {
    return (
      await fetch(
        `http://206.189.91.54/api/v1/messages?receiver_id=${directMessage.receiver}&receiver_class=User`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "access-token": token,
            client: client,
            expiry: expiry,
            uid: uid,
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({
          //   receiver_id: directMessage.receiver,
          //   receiver_class: directMessage.receiver_class,
          //   body: directMessage.body
          // }),
        }
      )
    ).json();
  };

  async function handleMessageReceive() {
    try {
      const fetch = await receiveMessageAPI(directMessage);

      if (fetch.data) {
        setReceivedMessages(fetch.data);
        setError("");
      } else if (!fetch.success) {
        setReceivedMessages([]);
        setError(fetch.errors);
      }
    } catch {}
  }

  useEffect(() => {
    handleMessageReceive();
  }, [directMessage.receiver, isMessaged]);
  /////////////////////////////////////////RECEIVED MESSAGES//////////////////////////////////////////////

  return (
    <>
      <div className="messages-div">
        <div className="top-message-div">
          <label>Contact ID#: </label>
          <input
            value={directMessage.receiver}
            type="number"
            placeholder="ID of Recipient"
            onChange={(e: any) =>
              setDirectMessage({ ...directMessage, receiver: e.target.value })
            }
          ></input>
          <h2>User #{directMessage.receiver}</h2>
          {/* <button onClick={handleMessageReceive}>REFRESH</button> */}
        </div>
        <div>
          <ul>
            <p className="error">{error}</p>
            {receivedMessages.map((message, index) =>
              message.sender.id == directMessage.receiver ? (
                <div className="received-message-div">
                  <li key={index} className="received-message">
                    {message.body}
                    <h6>received</h6>
                  </li>
                </div>
              ) : (
                <div className="sent-message-div">
                  <li key={index} className="sent-message">
                    {message.body}
                    <h6>sent</h6>
                  </li>
                </div>
              )
            )}
          </ul>
        </div>
        <div className="send-message-div">
            <input
              type="text"
              placeholder="Message..."
              onChange={(e: any) =>
                setDirectMessage({ ...directMessage, body: e.target.value })
              }
            ></input>
            <button onClick={handleMessageSend}>SEND</button>
        </div>
      </div>
    </>
  );
};

export default DirectMessages;
