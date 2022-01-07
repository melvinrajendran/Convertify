import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import Login from "./Login";
import Profile from "./Profile";
import { token } from "../spotify";

const App = () => {
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => setAccessToken(token), []);

  return (
    <div>
      {accessToken ? (
        <div>
          <Navigation />
          <Profile />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
