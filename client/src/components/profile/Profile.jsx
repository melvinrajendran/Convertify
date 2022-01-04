import React, { useEffect } from "react";

function Profile(props) {
  useEffect(() => (document.title = "Spotify Cleaner | Profile"));

  return (
    <div>
      <h1 className="text-center">{props.userName}</h1>
    </div>
  );
}

export default Profile;
