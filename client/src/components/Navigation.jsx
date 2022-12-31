import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { logOut } from "../spotify";
import "./Navigation.css";

const Navigation = () => {
  return (
    <Navbar variant="dark" fixed="top">
      <Container fluid>
        <Navbar.Brand href="/" className="bold-title ms-3 white-to-green">
          <div className="white-to-green mx-auto" title="View your Convertify profile">
            Convertify
          </div>
        </Navbar.Brand>
        <Nav className="ms-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
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
