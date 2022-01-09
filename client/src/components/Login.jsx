import React, { useEffect } from "react";
import FullScreenContainer from "./FullScreenContainer";
import PillButton from "./PillButton";

const LOGIN_URI = "http://localhost:8888/login";

const Login = () => {
  useEffect(() => (document.title = "Convertify | Login"), []);

  return (
    <FullScreenContainer>
      <h1 className="bold-title display-1">Convertify</h1>
      <p className="fs-5 mb-5 px-5 description-text gray-text">The easiest way to convert your Spotify playlists to clean or explicit.</p>
      <PillButton text="Log in to Spotify" href={LOGIN_URI} />
    </FullScreenContainer>
  );
};

export default Login;
