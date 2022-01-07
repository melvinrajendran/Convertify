import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { logOut } from "../spotify";
import "./Navigation.css";

const Navigation = () => {
  return (
    <Navbar variant="dark" fixed="top">
      <Container fluid>
        <Navbar.Brand href="/" className="bold-title">
          <span className="ms-3 white-to-green">Spotify Cleaner</span>
        </Navbar.Brand>
        <Nav className="ms-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
          <Nav.Link className="me-3" href="https://github.com/melvinrajendran/Spotify-Cleaner" target="_blank" rel="noopener noreferrer" title="See code on GitHub">
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
