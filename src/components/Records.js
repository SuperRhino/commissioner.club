import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container, Header, Icon } from '../styles';
import iconChamps from '../images/svg/044-crown.svg';
import iconPlayoffs from '../images/svg/067-banner-1.svg';

const ChampTable = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 0 1rem;
`;
const RecordTable = styled.table`
  width: 100%;
`;
const CenterItem = styled.div`
  text-align: center;
`;

let sortChamps = (a, b) => {
  // sort by year desc
  if (a[0] < b[0]) return 1;
  if (a[0] > b[0]) return -1;
  return 0;
};

let sortPlayoffRecord = (a, b) => {
  // sort by...
  // params: (array) [0:team, 1:num, 2:wins, 3:losses, 4:byes]
  // win percentages desc (wins/(wins+losses))
  let wpa = parseInt(a[2])/(parseInt(a[2]) + parseInt(a[3]));
  let wpb = parseInt(b[2])/(parseInt(b[2]) + parseInt(b[3]));
  if (wpa < wpb) return 1;
  if (wpa > wpb) return -1;
  // wins desc
  if (a[2] < b[2]) return 1;
  if (a[2] > b[2]) return -1;
  // num appearances desc
  if (a[1] < b[1]) return 1;
  if (a[1] > b[1]) return -1;
  // name asc
  if (a[0] < b[0]) return -1;
  if (a[0] > b[0]) return 1;
  return 0;
};

const Records = ({ appearances, champs }) => {
  return (
    <Fragment>
      <Container className={"Records-Champions"}>
        <Header>
          <Icon src={iconChamps} size={'large'} />
          Hall of Champions
        </Header>
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
      </Container>
      <Container className={"Records-PlayoffHistory"}>
        <Header>
          <Icon src={iconPlayoffs} size={'large'} />
          Playoff History
        </Header>
        <RecordTable>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}><h5>Team</h5></th>
              <th><h5>Appearances</h5></th>
              <th><h5>Record</h5></th>
              <th><h5>Byes</h5></th>
              <th><h5>Titles</h5></th>
            </tr>
          </thead>
          <tbody>
            {appearances.sort(sortPlayoffRecord).map(([team, num, wins, losses, byes, cgames, cwins], index) => {
              let backgroundColor = index % 2 === 0 ? 'white' : 'rgba(0,0,0,0.15)';
              return (
                <tr style={{ backgroundColor }} key={`records-${index}`}>
                  <td><div>{team}</div></td>
                  <td><CenterItem>{num}</CenterItem></td>
                  <td><CenterItem>{`${wins}-${losses}`}</CenterItem></td>
                  <td><CenterItem>{byes}</CenterItem></td>
                  <td><CenterItem>{cwins}</CenterItem></td>
                </tr>
              );
            })}
          </tbody>
        </RecordTable>
      </Container>
    </Fragment>
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
