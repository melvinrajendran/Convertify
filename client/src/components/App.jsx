import React, { useEffect, useState } from "react";
import Login from "./login/Login";
import Profile from "./profile/Profile";
import { token } from "../spotify";

function App() {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    setAccessToken(token);
  }, []);

  return <div>{accessToken ? <Profile /> : <Login />}</div>;
}

export default App;
