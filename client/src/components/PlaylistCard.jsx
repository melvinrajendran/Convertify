import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./PlaylistCard.css";

const PlaylistCard = (props) => {
  return (
    <Card className="playlist-card">
      <Card.Img className="text-center m-4" src={props.info.images.length > 0 ? props.info.images[0].url : process.env.PUBLIC_URL + "/empty-playlist.png"} alt="playlist" />
      <Card.Body className="pt-0">
        <Card.Title className="px-2">
          <h5 className="truncate-text">{props.info.name}</h5>
        </Card.Title>
        <Link className="stretched-link" to={`/playlists/${props.info.id}`} title={`Convert ${props.info.name}`} />
      </Card.Body>
    </Card>
  );
};

export default PlaylistCard;
