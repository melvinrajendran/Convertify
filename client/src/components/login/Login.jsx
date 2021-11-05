import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PillButton from "../common/buttons/PillButton";
import "./Login.css";

export default function Login() {
  useEffect(() => (document.title = "Spotify Cleaner | Login"));

  return (
    <Container fluid className="login-container text-center d-flex align-items-center justify-content-center">
      <Row>
        <Col>
          <h1 className="login-title display-1 mb-5">Spotify Cleaner</h1>
          <PillButton text="Log in to Spotify" />
        </Col>
      </Row>
    </Container>
  );
}
