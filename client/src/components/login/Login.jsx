import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PillButton from "../common/buttons/PillButton";
import "./Login.css";

const LOGIN_URI = "http://localhost:8888/login";

function Login() {
  useEffect(() => (document.title = "Spotify Cleaner | Login"));

  return (
    <Container fluid className="login-container text-center d-flex align-items-center justify-content-center">
      <Row>
        <Col>
          <h1 className="login-title display-1 mb-5">Spotify Cleaner</h1>
          <PillButton text="Log in to Spotify" href={LOGIN_URI} />
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
