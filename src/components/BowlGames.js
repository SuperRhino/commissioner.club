import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Header } from '../styles';
import placeholder from '../images/placeholder/records.png';

const Container = styled.div``;
const BowlHeader = styled.h5`
  background-color: rgba(0,0,0,0.5);
  color: #ffffff;
  margin-top: 1vmin;
  font-size: calc(10px + 1vmin);
  padding: 0 1vmin;
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
const WinningTeam = styled(Team)`
  font-weight: 600;
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


const BowlGames = (props) => {
  return (
    <Container>
      <Header>Bowl Games</Header>
      <BowlHeader style={{ backgroundColor: 'rgba(22,156,115,0.75)'}}>
        🍕 Papa Johns Bowl VIII
      </BowlHeader>
      <Matchup>
        <WinningTeam>Slick Nicholas <Score>132</Score></WinningTeam>
        <Team>Roids Hookers And Cocaine <Score>115</Score></Team>
      </Matchup>
      <Summary>
        Julio Jones & the Bears DST lead Slick Nicholas as Papa Nick secures their 2nd
        Papa Johns Bowl Title.
      </Summary>
      <BowlHeader style={{ backgroundColor: 'rgba(184,66,102, 0.85)'}}>
        🥣 Cereal Bowl VIII
      </BowlHeader>
      <Matchup>
        <WinningTeam>My Ditka Her Butkus <Score>136</Score></WinningTeam>
        <Team>Team BEER <Score>106</Score></Team>
      </Matchup>
      <Summary>
        MVP George Kittle gets 30 with 210 yards & TD. 
        JuJu Smith-Schuster scores 1 TD for each Ju in his name. 
        MDHB gets their 1st ever bowl win.
      </Summary>
      <BowlHeader>❌ Loser Bowl VIII</BowlHeader>
      <Matchup>
        <WinningTeam>KFC Karokee <Score>112</Score></WinningTeam>
        <Team>abc 123 <Score>118</Score></Team>
      </Matchup>
      <Summary>
        KFC Karaokee loses (and therefore wins) vs 4-time Loser Bowl Loser, abc 123.
        MVP LeSean McCoy finished the game with 1/10 of a point & a groin pull.
      </Summary>
      {/* <div><img src={placeholder} className="placeholder" alt="" /></div> */}
    </Container>
  );
};

export default BowlGames;
