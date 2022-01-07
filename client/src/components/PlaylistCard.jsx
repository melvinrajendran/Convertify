import React from "react";

const PlaylistCard = (props) => {
  return <img className="m-5 img-fluid" src={props.info.images[0].url} width="225" height="225" alt="playlist" />;
};

export default PlaylistCard;
