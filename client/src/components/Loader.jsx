import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import "./Loader.css";

const Loader = () => {
  return <Container fluid className="loader-container text-center d-flex align-items-center justify-content-center">
    <Row>
      <Col>
        <h1>Loading...</h1>
      </Col>
    </Row>
  </Container>;
};

export default Loader;