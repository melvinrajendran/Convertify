import React from "react";
import { Card } from "react-bootstrap";
import "./PlaylistCard.css";

const PlaylistCard = (props) => {
  return (
    <Card className="playlist-card">
      <Card.Img className="rounded pt-4 pb-1 px-4" variant="top" src={props.info.images[0].url} alt="playlist" />
      <Card.Body>
        <Card.Title className="ps-2">
          <h5>{props.info.name}</h5>
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default PlaylistCard;
