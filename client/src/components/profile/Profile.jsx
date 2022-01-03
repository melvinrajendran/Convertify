import React, { useEffect } from "react";

function Profile() {
  useEffect(() => (document.title = "Spotify Cleaner | Profile"));

  return (
    <div>
      <h1 className="text-center">This is your profile, hello.</h1>
    </div>
  );
}

export default Profile;
