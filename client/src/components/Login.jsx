import React, { useEffect } from "react";
import FullScreenContainer from "./FullScreenContainer";
import PillButton from "./PillButton";

const LOGIN_URI = "http://localhost:8888/login";

const Login = () => {
  useEffect(() => (document.title = "Spotify Cleaner | Login"), []);

  return (
    <FullScreenContainer>
      <h1 className="bold-title display-1 mb-5">Spotify Cleaner</h1>
      <PillButton text="Log in to Spotify" href={LOGIN_URI} />
    </FullScreenContainer>
  );
};

export default Login;
