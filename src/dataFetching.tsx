const controller = new AbortController();

const signUpAPI = async (newUser: any) => {
  return (
    await fetch("http://206.189.91.54/api/v1/auth/", {
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
  return await fetch("http://206.189.91.54/api/v1/auth/sign_in", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: signUser.email,
      password: signUser.password,
    }),
  });
};

const getChannels = async (userData: any) => {
  return (
    await fetch("http://206.189.91.54/api/v1/channels", {
      signal: controller.signal,
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
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
    await fetch(`http://206.189.91.54/api/v1/channels/${id}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "access-token": userData.token,
        client: userData.client,
        expiry: userData.expiry,
        uid: userData.uid,
      },
    })
  ).json();
};

export { signUpAPI, signInAPI, getChannels, getChannelDetails, controller };
