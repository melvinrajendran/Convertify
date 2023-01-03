import React from "react";
import { Col } from "react-bootstrap";

const UserStatistic = (props) => {
  return (
    <Col xs={4} sm={3} md={2} xxl={1} className="p-0">
      <h5 className="mb-1">{props.number}</h5>
      <p className="fs-6 gray-text">{props.label}</p>
    </Col>
  );
};

export default UserStatistic;
