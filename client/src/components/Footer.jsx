import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Container>
      <footer>
        <p className="h6 text-center mb-5">&copy; {currentYear} Melvin Rajendran</p>
      </footer>
    </Container>
  );
};

export default Footer;