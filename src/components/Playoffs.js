import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container, Header, Icon } from '../styles';
import iconPlayoffs from '../images/svg/048-trophy-1.svg';

const Matchup = styled.div`
  border: 1px solid #999999;
  padding: 2vmin 1rem;
  font-weight: 200;
  align-self: center;
  background-color: #C0C1AB;
  background-image: linear-gradient(to bottom, #C0C1AB, #CCCCCC);
`;

const playoffGrid = `
  "one-seed-bye-week"
  "four-vs-five-seed"
  "three-vs-six-seed"
  "two-seed-bye-week"
`;
const semisGrid = `
  "one-seed-bye-week semi-final-one"
  "four-vs-five-seed semi-final-one"
  "three-vs-six-seed semi-final-two"
  "two-seed-bye-week semi-final-two"
`;
const finalsGrid = `
  "one-seed-bye-week semi-final-one final-round"
  "four-vs-five-seed semi-final-one final-round"
  "three-vs-six-seed semi-final-two final-round"
  "two-seed-bye-week semi-final-two final-round"
`;
const Bracket = styled.div`
  display: grid;
  grid-template-columns: ${({ hasSemis, hasFinals }) =>
    hasFinals ? `1fr 2fr 3fr` : (hasSemis ? '1fr 2fr' : '1fr')
  };
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-areas: ${({ hasSemis, hasFinals }) =>
    hasFinals ? finalsGrid : (hasSemis ? semisGrid : playoffGrid)
  };
  grid-gap: 0.5rem;
`;

const OneSeedBye = styled(Matchup)`
  grid-area: one-seed-bye-week;
  font-size: ${({hasSemis, hasFinals}) =>
    `calc(10px + ${hasFinals ? 0 : (hasSemis ? 1 : 2)}vmin)`
  };
`;
const TwoSeedBye = styled(Matchup)`
  grid-area: two-seed-bye-week;
  font-size: ${({hasSemis, hasFinals}) =>
    `calc(10px + ${hasFinals ? 0 : (hasSemis ? 1 : 2)}vmin)`
  };
`;
const FourVsFiveSeed = styled(Matchup)`
  grid-area: four-vs-five-seed;
  font-size: ${({hasSemis, hasFinals}) =>
    `calc(10px + ${hasFinals ? 0 : (hasSemis ? 1 : 2)}vmin)`
  };
`;
const ThreeVsSixSeed = styled(Matchup)`
  grid-area: three-vs-six-seed;
  font-size: ${({hasSemis, hasFinals}) =>
    `calc(10px + ${hasFinals ? 0 : (hasSemis ? 1 : 2)}vmin)`
  };
`;
const SemiFinalOne = styled(Matchup)`
  grid-area: semi-final-one;
  font-size: ${({isPast}) => `calc(10px + ${isPast ? 1 : 2}vmin)`};
`;
const SemiFinalTwo = styled(Matchup)`
  grid-area: semi-final-two;
  font-size: ${({isPast}) => `calc(10px + ${isPast ? 1 : 2}vmin)`};
`;
const FinalRound = styled(Matchup)`
  grid-area: final-round;
`;

const Playoffs = ({ blob }) => {
  // const seeds = [1,2]
  let seeds = {};
  [1,2,3,4,5,6].forEach(s => {
    seeds[s] = blob[s-1] && blob[s-1][0] || null;
  });
  const winner4v5 = blob[0] && blob[0][1] || null;
  const winner3v6 = blob[1] && blob[1][1] || null;
  const finalist1 = blob[0] && blob[0][2] || null;
  const finalist2 = blob[1] && blob[1][2] || null;
  const hasSemis = winner4v5 || winner4v5;
  const hasFinals = finalist1 || finalist2;
  return (
    <Container>
      <Header>
        <Icon src={iconPlayoffs} size={'large'} />
        Playoffs
      </Header>
      <Bracket hasSemis={hasSemis} hasFinals={hasFinals}>
        <OneSeedBye hasSemis={hasSemis} hasFinals={hasFinals}>
          {seeds[1]}
        </OneSeedBye>
        <FourVsFiveSeed hasSemis={hasSemis} hasFinals={hasFinals}>
          {seeds[5]}<br />
          {seeds[4]}
        </FourVsFiveSeed>
        <ThreeVsSixSeed hasSemis={hasSemis} hasFinals={hasFinals}>
          {seeds[3]}<br />
          {seeds[6]}
        </ThreeVsSixSeed>
        <TwoSeedBye hasSemis={hasSemis} hasFinals={hasFinals}>
          {seeds[2]}
        </TwoSeedBye>
        {/* Second Round */}
        {hasSemis &&
          <Fragment>
            <SemiFinalOne isPast={hasFinals}>
              {seeds[1]}<br />
              {winner4v5}
            </SemiFinalOne>
            <SemiFinalTwo isPast={hasFinals}>
              {winner3v6}<br />
              {seeds[2]}
            </SemiFinalTwo>
          </Fragment>
        }
        {hasFinals &&
          <FinalRound>
            {finalist1}<br />
            {finalist2}
          </FinalRound>
        }
      </Bracket>
    </Container>
  );
};

Playoffs.propTypes = {
  // [team, image, caption, bullet1, bullet2, bullet3]
  blob: PropTypes.array,
};

Playoffs.defaultProps = {
  blob: [],
};

export default Playoffs;
