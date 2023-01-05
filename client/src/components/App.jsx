import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import Login from "./Login";
import Profile from "./Profile";
import { token } from "../spotify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PlaylistConverter from "./PlaylistConverter";
import NotFound from './NotFound';

const App = () => {
  const [accessToken, setAccessToken] = useState(null);
  useEffect(() => setAccessToken(token), []);

  return (
    <>
      {accessToken ? (
        <>
          <Navigation />
          <div className="body pt-5">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Profile />} />
                <Route path="/playlists/:playlistId" element={<PlaylistConverter />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default App;
