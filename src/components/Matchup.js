import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import placeholder from '../images/placeholder/matchup.png';
// const image1 = 'https://d3vv6lp55qjaqc.cloudfront.net/items/1f0p0t073X2M2O1n0O04/Screen%20Shot%202018-12-09%20at%209.13.54%20PM.png';
// const image2 = 'https://d3vv6lp55qjaqc.cloudfront.net/items/3h433I1S251C1q1b1Y1V/Screen%20Shot%202018-12-09%20at%209.15.30%20PM.png';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    "matchup-header matchup-header"
    "matchup1-top matchup2-top"
    "matchup-line matchup-line"
    "matchup1-info matchup2-info"
    ;
`;

const Header = styled.div`
  grid-area: matchup-header;
`;
const Line = styled.div`
  grid-area: matchup-line;
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

const List = styled.ul`
  font-size: calc(10px + 1vmin);
`;

const Matchup = ({ title, team1, team2 }) => {
  const [teamName1, image1, caption1, ...bullets1] = team1;
  const [teamName2, image2, caption2, ...bullets2] = team2;
  return (
    <Container>
      <Header>
        <h3>{title}</h3>
      </Header>
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
        <hr />
      </Line>
      <Matchup1Info>
        {teamName1}
        <List>
          {bullets1.map((b, i) => <li key={`team1-bullet-${i}`}>{b}</li>)}
        </List>
      </Matchup1Info>
      <Matchup2Info>
        {teamName2}
        <List>
          {bullets2.map((b, i) => <li key={`team2-bullet-${i}`}>{b}</li>)}
        </List>
      </Matchup2Info>
      {/* <div><img src={placeholder} className="placeholder" alt="" /></div> */}
    </Container>
  );
};

Matchup.propTypes = {
  title: PropTypes.string,
  // [team, image, caption, bullet1, bullet2, bullet3]
  team1: PropTypes.array,
  team2: PropTypes.array,
};

Matchup.defaultProps = {
  title: 'Matchup of the Week',
  team1: [],
  team2: [],
};

export default Matchup;
