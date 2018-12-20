import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Header } from '../styles';
import placeholder from '../images/placeholder/more-records.png';

const History = (props) => {
  return (
    <div className="History">
      <Header>History</Header>
      <div><img src={placeholder} className="placeholder" alt="" /></div>
    </div>
  );
};

export default History;
