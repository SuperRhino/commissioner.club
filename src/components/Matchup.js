import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container, Header, Icon } from '../styles';
import icon from '../images/svg/014-hot.svg';
import iconTrophy from '../images/svg/034-trophy.svg';
// import placeholder from '../images/placeholder/matchup.png';
// const image1 = 'https://d3vv6lp55qjaqc.cloudfront.net/items/1f0p0t073X2M2O1n0O04/Screen%20Shot%202018-12-09%20at%209.13.54%20PM.png';
// const image2 = 'https://d3vv6lp55qjaqc.cloudfront.net/items/3h433I1S251C1q1b1Y1V/Screen%20Shot%202018-12-09%20at%209.15.30%20PM.png';

const MatchupContainer = styled(Container)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    "matchup-header matchup-header"
    "matchup1-top matchup2-top"
    "matchup-line matchup-line"
    "matchup1-info matchup2-info"
    ;
`;

const MatchupHeader = styled(Header)`
  grid-area: matchup-header;
`;
const Line = styled.div`
  grid-area: matchup-line;

  hr {
    border-top: 1px solid #ccc;
    margin-bottom: 0;
  }
`;
const Matchup1Top = styled.div`
  grid-area: matchup1-top;
`;
const Matchup2Top = styled.div`
  grid-area: matchup2-top;
`;
const Matchup1Info = styled.div`
  grid-area: matchup1-info;
`;
const Matchup2Info = styled.div`
  grid-area: matchup2-info;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;
  padding: 150px 0 0 0;

  @media (min-width: 992px) {
    padding-top: 200px;
  }
`;
const SquareImage = styled.img`
  display: block;
  border-radius: 50%;
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin: 0 auto;

  @media (min-width: 992px) {
    width: 200px;
    height: 200px;
  }
`;

const Caption = styled.div`
  font-size: 12px;
  color: #666;
`;

const Team = styled.h4`
  background-color: #f5f5f5;
  text-align: center;
  margin-bottom: 0;
  padding: 1vmin;
`;

const List = styled.ul`
  font-size: calc(14px + 1vmin);
  list-style-type: none;
  margin-top: 0;
  padding-left: 0;
`;

const ListItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 1vmin;
  align-items: center;
  padding: 2vmin 0vmin;
  @media (min-width: 992px) {
    padding: 2vmin 4vmin;
  }
`;

const Matchup = ({ title, team1, team2, isDesktop }) => {
  const [teamName1, image1, caption1, ...bullets1] = team1;
  const [teamName2, image2, caption2, ...bullets2] = team2;
  return (
    <MatchupContainer>
      <MatchupHeader>
        <Icon src={iconTrophy} size={'large'} />
        {title}
      </MatchupHeader>
      <Matchup1Top>
        <ImageContainer>
          <SquareImage src={image1} alt="" />
        </ImageContainer>
        <Caption>{caption1}</Caption>
      </Matchup1Top>
      <Matchup2Top>
        <ImageContainer>
          <SquareImage src={image2} alt="" />
        </ImageContainer>
        <Caption>{caption2}</Caption>
      </Matchup2Top>
      <Line>
        <hr style={{ marginBottom: 0 }}/>
      </Line>
      <Matchup1Info>
        <Team>{teamName1}</Team>
        <List>
          {bullets1.map((b, i) =>
            <ListItem key={`team1-bullet-${i}`}>
              <Icon src={icon} size={isDesktop ? 'large' : 'md'} />
              {b}
            </ListItem>
          )}
        </List>
      </Matchup1Info>
      <Matchup2Info>
        <Team>{teamName2}</Team>
        <List>
          {bullets2.map((b, i) =>
            <ListItem key={`team2-bullet-${i}`}>
              <Icon src={icon} size={isDesktop ? 'large' : 'md'} />
              {b}
            </ListItem>
          )}
        </List>
      </Matchup2Info>
      {/* <div><img src={placeholder} className="placeholder" alt="" /></div> */}
    </MatchupContainer>
  );
};

Matchup.propTypes = {
  isDesktop: PropTypes.bool,
  title: PropTypes.string,
  // [team, image, caption, bullet1, bullet2, bullet3]
  team1: PropTypes.array,
  team2: PropTypes.array,
};

Matchup.defaultProps = {
  isDesktop: false,
  title: 'Matchup of the Week',
  team1: [],
  team2: [],
};

export default Matchup;
