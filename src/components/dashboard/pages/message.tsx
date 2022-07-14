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

  const [users, setUsers] = useState([])

  const [filteredArray, setFilteredArray] = useState([{uid:"", id:""}])

  const [recipientUID, setRecipientUID] = useState("")

  const selectBox = useRef(null)

  const [selectedUser, setSelectedUser] = useState(0)
  
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
        setDirectMessage({...directMessage, body: ""})
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
  

  setTimeout(handleMessageReceive,1000);
  /////////////////////////////////////////RECEIVED MESSAGES//////////////////////////////////////////////
  /////////////////////////////////////////GET USERS/////////////////////////////////////////////////////
  const getUsers = async () => {
    return (
      await fetch("http://206.189.91.54/api/v1/users", {
        method: "GET",
        headers: {
          "access-token": token,
          client: client,
          expiry: expiry,
          uid: uid,
        },
      })
    ).json();
  };

  async function handleGetUsers() {
    try {
      const fetch = await getUsers();

      if (fetch.data) {
        console.log(fetch.data);
        setUsers(fetch.data);
        setError("");
        setFilteredArray(users.filter((user)=>user.uid.includes(recipientUID)));
        console.log(filteredArray,'filtered array')
      } else if (!fetch.success) {
        setReceivedMessages([]);
        setError(fetch.errors);
        setFilteredArray([])
      }
    } catch {}
  }
  // useEffect(()=>{handleGetUsers()},[users]);
  
  useEffect(() => {
    handleGetUsers();
  }, [recipientUID]);

  function handleSelectChange(){
    if(selectBox.current!==undefined){
      console.log(selectBox.current.options[selectBox.current.options.selectedIndex].innerHTML)
      console.log(filteredArray[(selectBox.current.options.selectedIndex - 1)].id)
      setSelectedUser(Number(filteredArray[(selectBox.current.options.selectedIndex - 1)].id))
      setDirectMessage({ ...directMessage, receiver: Number(filteredArray[(selectBox.current.options.selectedIndex - 1)].id) })
    }
  }
  ////////////////////////////////////////GET USERS///////////////////////////////////////////////////////
  
  return (
    <>
      <div className="messages-div">
        <div className="top-message-div">
          <label>Search: </label>
          {/* <input
            value={directMessage.receiver}
            type="number"
            placeholder="ID of Recipient"
            className="contact-id-input"
            // onChange={(e: any) =>
            //   setDirectMessage({ ...directMessage, receiver: e.target.value })
            // }
          ></input> */}
          <input
            value={recipientUID}
            type="text"
            placeholder="UID of Recipient"
            className="contact-id-input"
            onChange={(e: any) =>
              setRecipientUID(e.target.value)
            }
          ></input>
          {/* <button onClick={handleGetUsers}>get users</button> */}
          
    {/* Get Users */}
                  
          <div>
            <label>UIDs: </label>
            <select ref={selectBox} onChange={handleSelectChange}>
              <option> Click here to see users! </option>
            {recipientUID!==""?filteredArray.map(user=>(<><option>{user.uid} | {user.id}</option></>)):<p>nothing</p>}
            </select>
          </div>

    {/* Get Users */}

          {selectedUser!==0?<h2>User #{selectedUser}</h2>:<h2>Select a User</h2>}
          <h2>User UID: {selectedUser}</h2>
          {/* <button onClick={handleMessageReceive}>REFRESH</button> */}
        </div>

        <div>
          <ul>
            {receivedMessages.map((message, index) =>
              message.sender.id == directMessage.receiver ? (
                <>
                <h5 className="recipient-user">User #{directMessage.receiver}</h5>
                <div className="received-message-div">
                  <li key={index} className="received-message">
                    {message.body}
                    <h6>received</h6>
                  </li>
                </div>
                <h6 className="received-date-and-time">{message.created_at}</h6>
                </>
              ) : (
                <>
                  <h5 className="sender-user">User #{signInData.id}</h5>
                  <div className="sent-message-div">
                    <li key={index} className="sent-message">
                      {message.body}
                      <h6>sent</h6>
                    </li>
                  </div>
                  <h6 className="sent-date-and-time">{message.created_at}</h6>
                </>
              )
            )}
          </ul>
        </div>

        <div className="bottom-div">
          {error!==""?<div className="error">
            <p >{error}</p>
          </div>: <p>{error}</p>}
          <div className="send-message-div">
              <input
                type="text"
                placeholder="Message..."
                className="message-box-input"
                value={directMessage.body}
                onChange={(e: any) =>
                  setDirectMessage({ ...directMessage, body: e.target.value })
                }
              ></input>
              <button className="send-button" onClick={handleMessageSend}>SEND</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DirectMessages;
