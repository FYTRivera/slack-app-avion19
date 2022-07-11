import React, { useState, useEffect, useRef } from "react";
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
    id?: number
  }
}

const DirectMessages: React.FC<messageProp> = (props) => {

  const [directMessage, setDirectMessage] = useState({
    receiver: null,
    receiver_class: "User",
    body: ""
  });

  const { token, client, expiry, uid, signInData } = props; 
  const receiver_id = useRef();
  const message_body = useRef();

  console.log(signInData.id)
  console.log(directMessage)

  const sendMessageAPI = async (e: any) => {
    return (
      await fetch("http://206.189.91.54/api/v1/messages", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "access-token": token,
          "client": client,
          "expiry": expiry,
          "uid": uid,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiver_id: directMessage.receiver,
          receiver_class: directMessage.receiver_class,
          body: directMessage.body
        }),
      })
    ).json();
  };

async function handleMessageSend(e: any){
  e.preventDefault();
  try {
    const fetch = await sendMessageAPI(directMessage);

    if (fetch.data) {
      
      console.log(fetch)
      console.log(fetch.data)

    } else if (!fetch.success) {
      
      console.log(fetch, "failed")
      
    }
  } catch {
    
  }
};

//////////////////////////////////////////////RECEIVED MESSAGES////////////////////////////////////////////////
const receiveMessageAPI = async (e: any) => {
  return (
    await fetch(`http://206.189.91.54/api/v1/messages?receiver_id=2242&receiver_class=User`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "access-token": token,
        "client": client,
        "expiry": expiry,
        "uid": uid,
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({
      //   receiver_id: directMessage.receiver,
      //   receiver_class: directMessage.receiver_class,
      //   body: directMessage.body
      // }),
    })
  ).json();
};

async function handleMessageReceive(e: any){
  e.preventDefault();
  try {
    const fetch = await receiveMessageAPI(directMessage);

    if (fetch.data) {
      
      console.log(fetch)
      console.log(fetch.data)

    } else if (!fetch.success) {
      
      console.log(fetch, "failed")
      
    }
  } catch {
    
  }
};

/////////////////////////////////////////RECEIVED MESSAGES//////////////////////////////////////////////

  return (
    <>
    <div>
      <div>
        <h1>Messages</h1>
      </div>
      <div>
        <p>Send Message</p>
      </div>
      <div>
        <input 
          ref={receiver_id} 
          type="number" 
          placeholder="ID of Recipient" 
          onChange={((e: any)=>setDirectMessage({...directMessage, receiver: e.target.value}))}>
        </input>
      </div>
      <div>
        <input 
          ref={message_body} 
          type="text" 
          placeholder="Message..." 
          onChange={((e: any)=>setDirectMessage({...directMessage, body: e.target.value}))}>
        </input>
      </div>
      <div>
        <button onClick={handleMessageSend}>SEND</button>
      </div>
      <div>
        <p>Received Messages</p>
        <button onClick={handleMessageReceive}>TEST RECEIVE</button>
      </div>
    </div>
    </>
  );
};

export default DirectMessages;
