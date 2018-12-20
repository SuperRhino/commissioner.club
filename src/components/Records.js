import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Header } from '../styles';

const Container = styled.div``;
const ChampTable = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 0 1rem;
`;
const RecordTable = styled.table``;
const CenterItem = styled.div`
  text-align: center;
`;

let sortChamps = (a, b) => {
  // sort by year desc
  if (a[0] < b[0]) return 1;
  if (a[0] > b[0]) return -1;
  return 0;
};

let sortAppearances = (a, b) => {
  // sort by num appearances desc
  if (a[1] < b[1]) return 1;
  if (a[1] > b[1]) return -1;
  // then by wins desc
  if (a[2] < b[2]) return 1;
  if (a[2] > b[2]) return -1;
  // then by name asc
  if (a[0] < b[0]) return -1;
  if (a[0] > b[0]) return 1;
  return 0;
};

const Records = ({ appearances, champs }) => {
  return (
    <Container>
      <Header>🏆 Hall of Champions 🏆</Header>
      <ChampTable>
        <h5>Year</h5>
        <h5>Team</h5>
        <h5>Seed</h5>
        {champs.sort(sortChamps).map(([year, team, seed], ix) => 
          <Fragment key={`champ-frag-${ix}`}>
            <div>{year}</div>
            <div>{team}</div>
            <div>{seed}</div>
          </Fragment>
        )}
      </ChampTable>
      <Header>Playoff Appearances</Header>
      <RecordTable>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}><h5>Team</h5></th>
            <th><h5>Appearances</h5></th>
            <th><h5>Record</h5></th>
            <th><h5>Byes</h5></th>
          </tr>
        </thead>
        <tbody>
          {appearances.sort(sortAppearances).map(([team, num, wins, losses, byes], index) => {
            let backgroundColor = index % 2 === 0 ? 'white' : 'rgba(0,0,0,0.15)';
            return (
              <tr style={{ backgroundColor }} key={`records-${index}`}>
                <td><div>{team}</div></td>
                <td><CenterItem>{num}</CenterItem></td>
                <td><CenterItem>{`${wins}-${losses}`}</CenterItem></td>
                <td><CenterItem>{byes}</CenterItem></td>
              </tr>
            );
          })}
        </tbody>
      </RecordTable>
    </Container>
  );
};

Records.propTypes = {
  // Last Update: 2018 *after round 1*
  // [team, num, wins, losses, byes]
  appearances: PropTypes.array,
  // [year, team, seed]
  champs: PropTypes.array,
};

export default Records;
