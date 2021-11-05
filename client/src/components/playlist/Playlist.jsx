import React, { useEffect } from "react";

export default function Playlist() {
  useEffect(() => (document.title = "Spotify Cleaner | Playlist"));

  return (
    <div>
      <h1>Playlist</h1>
    </div>
  );
}
