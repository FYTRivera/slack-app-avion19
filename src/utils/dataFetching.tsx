const signUpAPI = async (newUser: any) => {
  return (
    await fetch(`http://${process.env.REACT_APP_API_URL}/api/v1/auth/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        password_confirmation: newUser.password_confirmation,
      }),
    })
  ).json();
};

const signInAPI = async (signUser: any) => {
  return await fetch(
    `http://${process.env.REACT_APP_API_URL}/api/v1/auth/sign_in`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: signUser.email,
        password: signUser.password,
      }),
    }
  );
};

const getChannels = async (userData: any) => {
  return (
    await fetch(`http://${process.env.REACT_APP_API_URL}/api/v1/channels`, {
      method: "GET",
      headers: {
        "access-token": userData.token,
        client: userData.client,
        expiry: userData.expiry,
        uid: userData.uid,
      },
    })
  ).json();
};

const getChannelDetails = async (userData: any, id: any) => {
  return (
    await fetch(
      `http://${process.env.REACT_APP_API_URL}/api/v1/channels/${id}`,
      {
        method: "GET",
        headers: {
          "access-token": userData.token,
          client: userData.client,
          expiry: userData.expiry,
          uid: userData.uid,
        },
      }
    )
  ).json();
};

const createChannel = async (
  userData: any,
  createChannelInfo: {
    name: string;
    user_ids: any[];
    description: string;
  }
) => {
  return (
    await fetch(`http://${process.env.REACT_APP_API_URL}/api/v1/channels`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": userData.token,
        client: userData.client,
        expiry: userData.expiry,
        uid: userData.uid,
      },
      body: JSON.stringify({
        name: createChannelInfo.name,
        user_ids: createChannelInfo.user_ids,
        description: createChannelInfo.description,
      }),
    })
  ).json();
};

const sendMessageAPI = async (userData: any, directMessage: any) => {
  return (
    await fetch(`http://${process.env.REACT_APP_API_URL}/api/v1/messages`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "access-token": userData.token,
        client: userData.client,
        expiry: userData.expiry,
        uid: userData.uid,
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

const receiveMessageAPI = async (userData: any, directMessage: any) => {
  return (
    await fetch(
      `http://${process.env.REACT_APP_API_URL}/api/v1/messages?receiver_id=${directMessage.receiver}&receiver_class=User`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "access-token": userData.token,
          client: userData.client,
          expiry: userData.expiry,
          uid: userData.uid,
          "Content-Type": "application/json",
        },
      }
    )
  ).json();
};

const getUsers = async (userData: any) => {
  return (
    await fetch(`http://${process.env.REACT_APP_API_URL}/api/v1/users`, {
      method: "GET",
      headers: {
        "access-token": userData.token,
        client: userData.client,
        expiry: userData.expiry,
        uid: userData.uid,
      },
    })
  ).json();
};

export {
  signUpAPI,
  signInAPI,
  getChannels,
  getChannelDetails,
  createChannel,
  sendMessageAPI,
  receiveMessageAPI,
  getUsers,
};
