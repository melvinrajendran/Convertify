import React from "react";
import PlaylistCard from "./PlaylistCard";

const Playlists = (props) => {
  return (
    <div>
      <h2 className="ps-5 display-5 bold-title">Playlists</h2>
      <div className="text-center">{props.playlists && props.playlists.items.map((playlist, index) => <PlaylistCard key={index} info={playlist} />)}</div>
    </div>
  );
};

export default Playlists;
