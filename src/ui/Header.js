import React from 'react';
import PropTypes from 'prop-types';
import logo from '../images/ff-badge.png';

const Header = (props) => {
  return (
    <header className="app-header">
      <a
        className="app-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={logo} className="app-logo" alt="logo" />
        <p>
          The Fantasy Commission
        </p>
      </a>
      <button type="button" className="app-menu-button">&#9776;</button>
    </header>
  );
};

export default Header;
