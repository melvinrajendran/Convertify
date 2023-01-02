import React from 'react';
import './NotFound.css';
import { Col, Container, Row } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container fluid className="p-4">
      <Row className="p-5 not-found-container align-items-center">
        <Col className="text-center py-5">
          <h1 className="display-1 bold-title mb-2">404</h1>
          <p className="fs-4 gray-text">We couldn't find the page you were looking for.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;