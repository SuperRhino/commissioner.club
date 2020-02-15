import React from 'react';
import PropTypes from 'prop-types';
import placeholder from '../images/placeholder/footer.png';

const Footer = (props) => {
  return (
    <footer className="app-footer">
      <img src={placeholder} className="placeholder" alt="" />
    </footer>
  );
};

export default Footer;
