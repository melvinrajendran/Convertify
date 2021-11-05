import React, { useEffect } from "react";

export default function Profile() {
  useEffect(() => (document.title = "Spotify Cleaner | Profile"));

  return (
    <div>
      <h1>This is your profile, hello.</h1>
    </div>
  );
}
