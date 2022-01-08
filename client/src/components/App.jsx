import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import Login from "./Login";
import Profile from "./Profile";
import { token } from "../spotify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PlaylistDetails from "./PlaylistDetails";

const App = () => {
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => setAccessToken(token), []);

  return (
    <>
      {!accessToken ? (
        <Login />
      ) : (
        <div className="body px-5 pb-5">
          <Navigation />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Profile />} />
              <Route path="/playlists/:playlistId" element={<PlaylistDetails />} />
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </>
  );
};

export default App;
