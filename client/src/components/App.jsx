import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./login/Login";
import Profile from "./profile/Profile";
import Playlist from "./playlist/Playlist";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/playlist">
          <Playlist />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
