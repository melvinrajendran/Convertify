import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import PlaylistCard from "./PlaylistCard";

const Playlists = (props) => {
  return (
    <Container fluid className="px-5 pb-5">
      <h2 className="display-5 bold-title">Playlists</h2>
      <p className="fs-5 mb-5 gray-text">Select a playlist to convert.</p>
      <Row className="gy-4">
        {props.playlists &&
          props.playlists.items.map((playlist, index) => (
            <Col className="d-flex justify-content-center gx-4" key={index}>
              <PlaylistCard key={index} info={playlist} />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Playlists;
