import React from "react";
import { Row } from "react-bootstrap";
import { logOut } from "../spotify";
import PillButton from "./PillButton";
import UserStatistic from "./UserStatistic";

const User = (props) => {
  return (
    <div className="text-center py-5">
      <img className="img-fluid rounded-circle" src={props.imageUrl} width="175" height="175" alt="avatar" />
      <h1 className="my-4 display-4 bold-title">
        <a href={props.profileUrl}>{props.name}</a>
      </h1>
      <Row className="justify-content-center mb-4">
        {props.statistics.map((stat, index) => (
          <UserStatistic key={index} number={stat.number} label={stat.label} />
        ))}
      </Row>
      <PillButton outline text="Logout" href="/" onClick={logOut} />
    </div>
  );
};

export default User;
