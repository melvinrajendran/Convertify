import React from "react";
import { Container, Row } from "react-bootstrap";
import UserStatistic from "./UserStatistic";

const User = (props) => {
  return (
    <div className="text-center px-5 mb-5">
      <img className="img-fluid rounded-circle" src={props.user.images[0].url} width="175" height="175" alt="avatar" />
      <h1 className="my-4 display-4 bold-title">
        <a className="white-to-green" href={props.user.external_urls.spotify} target="_blank" rel="noopener noreferrer" title="See your profile on Spotify">
          {props.user.display_name}
        </a>
      </h1>
      <Container fluid>
        <Row className="d-flex justify-content-center">
          {props.statistics.map((stat, index) => (
            <UserStatistic key={index} number={stat.number} label={stat.label} />
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default User;
