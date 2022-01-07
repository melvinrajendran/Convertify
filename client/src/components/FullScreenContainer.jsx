import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const FullScreenContainer = (props) => {
  return (
    <Container fluid className="fullscreen-container text-center d-flex align-items-center justify-content-center">
      <Row>
        <Col>{props.children}</Col>
      </Row>
    </Container>
  );
};

export default FullScreenContainer;
