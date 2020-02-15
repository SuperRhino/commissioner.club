import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import iconNews from '../../images/svg/004-newspaper.svg';
import { Container, Header, Icon } from '../../styles';

const Story = styled.div`
  padding: 0;
`;

const StoryBody = styled.div`
  font-size: calc(10px + 1vmin);
  column-count: 1;
  letter-spacing: 0.45px;
  line-height: 1.3rem;

  @media (min-width: 992px) {
    column-count: 2;
  }

  p {
    margin: 0 0 1em;
  }
`;

const ImageContainer = styled.div``;

const StoryFeed = ({ stories }) => {
  if (stories.length === 0) return null;

  const [headline, subtitle, body, image] = stories[0];
  return (
    <Container>
      <Header>
        <Icon src={iconNews} size={'large'} />
        In Other News...
      </Header>
      <Story>
        <h4>{headline}</h4>
        {image &&
          <ImageContainer>
            <img src={image} className="placeholder" alt="" />
          </ImageContainer>
        }
        <h5>{subtitle}</h5>
        <StoryBody>
          {body && body.split('\n').map((p, ix) => <p key={`top-story-${ix}`}>{p}</p>)}
        </StoryBody>
      </Story>
    </Container>
  );
};

StoryFeed.propTypes = {
  // array of: [headline, subtitle, body, image]
  stories: PropTypes.array,
};

StoryFeed.defaultProps = {
  stories: [],
};

export default StoryFeed;
