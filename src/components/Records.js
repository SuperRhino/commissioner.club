import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';
import { Container, Header, Icon } from '../styles';
import iconChamps from '../images/svg/044-crown.svg';
import iconPlayoffs from '../images/svg/067-banner-1.svg';

/* ================================
   Hall of Champions (Madden '94 vibe)
================================ */

// subtle CRT-ish flicker for the most recent champ
const crtFlicker = keyframes`
  0%   { opacity: 1;   filter: none; }
  7%   { opacity: 0.96; filter: brightness(1.02); }
  12%  { opacity: 1; }
  19%  { opacity: 0.98; filter: brightness(1.01); }
  23%  { opacity: 1; }
  34%  { opacity: 0.97; filter: brightness(1.03); }
  38%  { opacity: 1; }
  52%  { opacity: 0.99; }
  68%  { opacity: 0.97; filter: brightness(1.02); }
  72%  { opacity: 1; filter: none; }
  100% { opacity: 1; filter: none; }
`;

const ChampTable = styled.div`
  width: 100%;
  margin-top: 0.5rem;

  display: grid;
  grid-template-columns: 84px 1fr;
  grid-gap: 0.5rem 0.75rem;

  /* Header row */
  & > h5 {
    margin: 0;
    padding: 0.6rem 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-weight: 800;
    font-size: 0.9rem;

    color: #f5f5dc;
    background: #2b2e4a;
    border: 2px solid #000;
    box-shadow:
      inset 2px 2px 0 rgba(255,255,255,0.18),
      inset -2px -2px 0 rgba(0,0,0,0.45),
      2px 2px 0 #000;
  }
`;

const MaddenCell = styled.div`
  position: relative;
  padding: 0.65rem 0.75rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  line-height: 1.1;
  text-transform: uppercase;

  color: #141414;

  background-color: #c9c9b3;
  background-size: 100% 4px;
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 50%, rgba(0,0,0,0.04) 50%),
    linear-gradient(to bottom, #dadac2 0%, #b2b29a 100%);

  border: 3px solid #2b2e4a;
  box-shadow:
    inset 2px 2px 0 rgba(255,255,255,0.45),
    inset -2px -2px 0 rgba(0,0,0,0.35),
    3px 3px 0 #7a1f1f;

  ${({ align }) => align && css`text-align: ${align};`}

  /* top accent stripe */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 6px;
    width: 100%;
    background: linear-gradient(to right, #7a1f1f, #d1a84b, #7a1f1f);
  }
`;

const TeamCell = styled(MaddenCell)`
  display: flex;
  align-items: center;          /* ✅ vertical centering */
  justify-content: space-between;
  gap: 0.75rem;

  ${({ isMostRecent }) =>
    isMostRecent &&
    css`
      animation: ${crtFlicker} 2.6s infinite;
      text-shadow: 0 0 2px rgba(255,255,255,0.12);
    `}
`;

const TeamName = styled.span`
  display: inline-flex;
  align-items: center;
  min-width: 0;
`;

const SeedChip = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  height: 18px;
  padding: 0 6px;

  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0;

  color: ${({ isOneSeed }) => (isOneSeed ? '#1a1a1a' : '#f5f5dc')};
  background-color: ${({ isOneSeed }) => (isOneSeed ? '#d1a84b' : '#2b2e4a')};

  border: 2px solid #000;

  box-shadow:
    inset 2px 2px 0 rgba(255,255,255,0.25),
    inset -2px -2px 0 rgba(0,0,0,0.45),
    2px 2px 0 #000;

  ${({ isOneSeed }) =>
    isOneSeed &&
    css`
      /* subtle “gold foil” vibe */
      box-shadow:
        inset 2px 2px 0 rgba(255,255,255,0.35),
        inset -2px -2px 0 rgba(0,0,0,0.30),
        2px 2px 0 #000,
        0 0 6px rgba(209,168,75,0.35);
    `}

  image-rendering: pixelated;
`;

/* ================================
   Playoff History (leave as-is)
================================ */

const RecordTable = styled.table`
  width: 100%;
`;
const CenterItem = styled.div`
  text-align: center;
`;

/* ================================
   Sorting Helpers (keep your logic)
================================ */

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
  // Most recent champ = max year (for CRT flicker)
  const mostRecentYear =
    champs && champs.length
      ? champs.reduce((max, [year]) => (year > max ? year : max), -Infinity)
      : null;

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

          {champs.sort(sortChamps).map(([year, team, seed], ix) => {
            const isMostRecent = mostRecentYear !== null && year === mostRecentYear;
            const isOneSeed = String(seed) === '1' || seed === 1;

            return (
              <Fragment key={`champ-frag-${ix}`}>
                <MaddenCell align="center">{year}</MaddenCell>

                <TeamCell isMostRecent={isMostRecent}>
                  <TeamName>{team}</TeamName>
                  {seed != null && seed !== '' && (
                    <SeedChip isOneSeed={isOneSeed}>{seed}</SeedChip>
                  )}
                </TeamCell>
              </Fragment>
            );
          })}
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
  // [team, num, wins, losses, byes]
  appearances: PropTypes.array,
  // [year, team, seed]
  champs: PropTypes.array,
};

export default Records;
