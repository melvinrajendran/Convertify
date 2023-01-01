import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import Login from "./Login";
import Profile from "./Profile";
import { token } from "../spotify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PlaylistConverter from "./PlaylistConverter";

const App = () => {
  const [accessToken, setAccessToken] = useState(null);
  useEffect(() => setAccessToken(token), []);

  return (
    <>
      {accessToken ? (
        <>
          <Navigation />
          <div className="body p-5">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Profile />} />
                <Route path="/playlists/:playlistId" element={<PlaylistConverter />} />
              </Routes>
            </BrowserRouter>
          </div>
        </>
      ) : (
        <Login />
      )}
      {/* <Footer /> */}
    </>
  );
};

export default App;
