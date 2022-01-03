import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container, Header } from '../styles';
import placeholder from '../images/placeholder/more-records.png';

const sheetSrc = 'https://docs.google.com/spreadsheets/d/1n6KpxAspvzpVt-Oef6ZVA44qEPuHCDcUAMEqQ0WTSoI/edit?usp=sharing';
const History = (props) => {
  return (
    <Container className="History">
      <Header>History</Header>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <a href={sheetSrc} target="_blank" style={{ flex: 1 }}>
          <img src={placeholder} className="placeholder" alt="" style={{ border: 0, width: '100%' }} />
        </a>
      </div>
    </Container>
  );
};

export default History;
