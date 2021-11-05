import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./login/Login";
import Profile from "./profile/Profile";
import Playlist from "./playlist/Playlist";

export default function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div>
      {/* <p>{!data ? "Loading..." : data}</p> */}
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
    </div>
  );
}
