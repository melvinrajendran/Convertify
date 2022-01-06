import React, { useEffect } from "react";
import PillButton from "../common/buttons/PillButton";
import { getUser, logOut } from "../../spotify";

function Profile() {
  useEffect(() => (document.title = "Spotify Cleaner | Profile"), []);

  const user = getUser();
  console.log(user);

  return (
    <div>
      <h1 className="text-center mt-5">Hello, this is your profile.</h1>
      <div onClick={logOut}>
        <PillButton outline text="Logout" href="/" />
      </div>
    </div>
  );
}

export default Profile;
