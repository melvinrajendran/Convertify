import React from "react";
import { Row, Col } from "react-bootstrap";
import PlaylistCard from "./PlaylistCard";

const Playlists = (props) => {
  return (
    <div>
      <h2 className="ps-5 display-5 bold-title">Playlists</h2>
      <Row className="g-4 p-4">
        {props.playlists &&
          props.playlists.items.map((playlist, index) => {
            return (
              <Col className="d-flex justify-content-center mb-md-3" key={index}>
                <PlaylistCard key={index} info={playlist} />
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default Playlists;
