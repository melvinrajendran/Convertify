import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { logOut } from "../spotify";
import "./Navigation.css";

const Navigation = () => {
  const { PUBLIC_URL } = process.env;

  return (
    <Navbar variant="dark" fixed="top">
      <Container fluid>
        <Navbar.Brand href="/" className="bold-title ms-3">
          <img
            alt="Spotify logo"
            src={PUBLIC_URL + "/Spotify.png"}
            width="36"
            height="36"
            className="d-inline-block align-top"
          />{' '}
          <span className="white-to-green mx-auto" title="View your Convertify profile">
            Convertify
          </span>
        </Navbar.Brand>
        <Nav className="ms-auto my-2 my-lg-0" style={{ maxHeight: "6.25rem" }} navbarScroll>
          <Nav.Link className="me-3" href="https://github.com/melvinrajendran/Convertify" target="_blank" rel="noopener noreferrer" title="View code on GitHub">
            <i className="fab fa-github"></i>
          </Nav.Link>
          <Nav.Link className="me-3" onClick={logOut} href="/" title="Log out">
            <i className="fas fa-sign-out-alt"></i>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
