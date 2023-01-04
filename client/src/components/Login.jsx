import React, { useEffect } from "react";
import FullScreenContainer from "./FullScreenContainer";
import PillButton from "./PillButton";

const Login = () => {
  useEffect(() => (document.title = "Convertify | Login"), []);

  return (
    <FullScreenContainer>
      <h1 className="bold-title display-1">Convertify</h1>
      <p className="fs-5 mb-5 px-5 description-text gray-text">The easiest way to convert your Spotify playlists between explicit and clean.</p>
      <PillButton text="Log in to Spotify" href={process.env.LOGIN_URI} title="Log in to Spotify" />
    </FullScreenContainer>
  );
};

export default Login;
