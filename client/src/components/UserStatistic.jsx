import React from "react";
import { Col } from "react-bootstrap";
import "./UserStatistic.css";

const UserStatistic = (props) => {
  return (
    <Col xs={4} sm={3} md={2} xxl={1} className="stat-col">
      <h5>{props.number}</h5>
      <h6 className="label-text">{props.label.toUpperCase()}</h6>
    </Col>
  );
};

export default UserStatistic;
