import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p className="text-center gray-text">&copy; {currentYear} Melvin Rajendran</p>
    </footer>
  );
};

export default Footer;