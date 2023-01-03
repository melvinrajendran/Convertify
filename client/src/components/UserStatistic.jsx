import React from "react";
import { Col } from "react-bootstrap";

const UserStatistic = (props) => {
  return (
    <Col xs={4} sm={3} md={2} xxl={1} className="p-0">
      <h2 className="h5 mb-0">{props.number}</h2>
      <p className="fs-6 gray-text">{props.label}</p>
    </Col>
  );
};

export default UserStatistic;
