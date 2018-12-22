import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;

  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 0.5em;
    grid-template-columns: 3fr 2fr;
  }
`;

const Story = styled.div`
  padding: 0;
`;

const StoryBody = styled.div`
  font-size: calc(10px + 1vmin);
  column-count: 2;
  letter-spacing: 0.45px;
  line-height: 1.3rem;

  @media (min-width: 992px) {
    column-count: 3;
    padding: 2vmin 4rem 2vmin 0;
  }

  p {
    margin: 0 0 1em;
  }
`;

const ImageContainer = styled.div`

`;

const TopStory = ({ story }) => {
  const [headline, subtitle, body, image] = story;
  return (
    <Container>
      <Story>
        <h2>{headline}</h2>
        <h4>{subtitle}</h4>
        <StoryBody>
          {body && body.split('\n').map((p, ix) => <p key={`top-story-${ix}`}>{p}</p>)}
        </StoryBody>
      </Story>
      <ImageContainer>
        {image &&
          <img src={image} className="placeholder" alt="" />
        }
      </ImageContainer>
    </Container>
  );
};

TopStory.propTypes = {
  // [headline, subtitle, body, image]
  story: PropTypes.array,
};

TopStory.defaultProps = {
  story: [],
};

export default TopStory;
