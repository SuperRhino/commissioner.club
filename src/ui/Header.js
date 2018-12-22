import React from 'react';
import PropTypes from 'prop-types';
import logo from '../images/ff-badge.png';

const handleClick = (e) => {
  e.preventDefault();
  alert("💥 boom! great job clickin' shit, stud");
};

const Header = (props) => {
  return (
    <header className="app-header">
      <a
        className="app-link"
        href="/"
      >
        <img src={logo} className="app-logo" alt="logo" />
        <p>
          The Fantasy Commission
        </p>
      </a>
      <button type="button" className="app-menu-button" onClick={handleClick}>&#9776;</button>
    </header>
  );
};

export default Header;
