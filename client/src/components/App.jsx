import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import Login from "./Login";
import Profile from "./Profile";
import { token } from "../spotify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Playlist from "./Playlist";

const App = () => {
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => setAccessToken(token), []);

  return (
    <>
      {!accessToken ? (
        <Login />
      ) : (
        <>
          <Navigation />
          <div className="body p-5">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Profile />} />
                <Route path="/playlists/:playlistId" element={<Playlist />} />
              </Routes>
            </BrowserRouter>
          </div>
        </>
      )}
    </>
  );
};

export default App;
