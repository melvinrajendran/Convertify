import React from "react";
import { Row } from "react-bootstrap";
import UserStatistic from "./UserStatistic";

const User = (props) => {
  return (
    <div className="text-center py-5">
      <img className="img-fluid rounded-circle" src={props.imageUrl} width="175" height="175" alt="avatar" />
      <h1 className="my-4 display-4 bold-title">
        <a className="white-to-green" href={props.profileUrl} target="_blank" rel="noopener noreferrer" title="See your profile on Spotify">
          {props.name}
        </a>
      </h1>
      <Row className="justify-content-center">
        {props.statistics.map((stat, index) => (
          <UserStatistic key={index} number={stat.number} label={stat.label} />
        ))}
      </Row>
    </div>
  );
};

export default User;
