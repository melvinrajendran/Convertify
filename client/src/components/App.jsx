import React, { useEffect, useState } from "react";
import Login from "./Login";
import Profile from "./Profile";
import { token } from "../spotify";

const App = () => {
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => setAccessToken(token), []);

  return <div>{accessToken ? <Profile /> : <Login />}</div>;
};

export default App;
