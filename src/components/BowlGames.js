import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container, Header, Icon } from '../styles';
import iconBowl from '../images/svg/football.svg';
import iconPizza from '../images/svg/030-pizza.svg';
import iconCereal from '../images/svg/008-pour.svg';
import iconLoser from '../images/svg/101-accident.svg';

const BowlHeader = styled.h5`
  background-color: rgba(0,0,0,0.5);
  color: #ffffff;
  margin-top: 1vmin;
  font-size: calc(10px + 1vmin);
  display: flex;
  align-items: center;
  padding: 1vmin;
  text-transform: uppercase;
`;
const Matchup = styled.div`
  display: flex;
  margin-top: 0.5em;
  justify-content: space-between;
`;
const Team = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row-reverse;
`;
const LeftTeam = styled(Team)`
  flex-direction: row;
`;
const Score = styled.span`
  color: red;
  padding: 0 1vmin;
`;
const Summary = styled.div`
  font-size: calc(10px + 1vmin);
  margin-bottom: 1em;
`;

const winnerStyles = { fontWeight: 600 };
const loserStyles = { color: '#666666' };

const defaultInfo = {icon: iconBowl, backgroundColor: 'rgba(0,0,0,0.5)'};
const bowlInfo = [
  {icon: iconPizza, backgroundColor: 'rgba(22,156,115,0.75)'},
  {icon: iconCereal, backgroundColor: 'rgba(184,66,102,0.85)'},
  {icon: iconLoser, backgroundColor: 'rgba(0,0,0,0.5)', reverse: true},
];


const BowlGames = ({ bowls }) => {
  if (bowls.length === 0) return null;

  return (
    <Container>
      <Header>
        <Icon src={iconBowl} size={'large'} />
        Bowl Games
      </Header>
      {bowls.map((data, ix) => {
        const [bowlgame, team1, score1, team2, score2, blurb] = data;
        const { icon, backgroundColor, reverse } = bowlInfo[ix] || defaultInfo;
        const isComplete = score1 && score2;
        const team1Wins = reverse ? +score1 < +score2 : +score1 > +score2;
        const team1style = !isComplete ? {} : (
          team1Wins ? winnerStyles : loserStyles
        );
        const team2style = !isComplete ? {} : (
          !team1Wins ? winnerStyles : loserStyles
        );
        return (
          <Fragment>
            <BowlHeader style={{ backgroundColor }}>
              <Icon src={icon} />
              {bowlgame}
            </BowlHeader>
            <Matchup>
              <LeftTeam style={{ ...team1style }}>
                {team1} {score1 && <Score>{score1}</Score>}
              </LeftTeam>
              <Team style={{ ...team2style }}>
                {team2} {score2 && <Score>{score2}</Score>}
              </Team>
            </Matchup>
            <Summary>
              {blurb}
            </Summary>
          </Fragment>
        );
      })}
    </Container>
  );
};

BowlGames.propTypes = {
  // Array of: [bowlgame, team1, score1, team2, score2, blurb]
  bowls: PropTypes.array,
};

BowlGames.defaultProps = {
  bowls: [],
};

export default BowlGames;
