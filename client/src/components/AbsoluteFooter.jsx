import React from "react";

const AbsoluteFooter = () => {
  return <footer>
    <p className="position-absolute gray-text absolute-footer">&copy; {new Date().getFullYear()} Melvin Rajendran</p>
  </footer>;
}

export default AbsoluteFooter;