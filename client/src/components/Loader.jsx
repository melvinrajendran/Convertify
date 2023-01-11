import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import "./Loader.css";

const Loader = (props) => {
  return <Container fluid className={`${props.fullScreen ? "loader-full-screen" : ""} text-center d-flex align-items-center justify-content-center`}>
    <Row>
      <Col>
        <i className="loader fas fa-sync-alt rotating" />
      </Col>
    </Row>
  </Container>;
};

export default Loader;