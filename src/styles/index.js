import styled, { css } from 'styled-components';

const SIZE_LG = 48;
const SIZE_MD = 32;

export const Container = styled.div`
  margin-bottom: 3rem;
`;

export const Icon = styled.img`
  width: ${SIZE_MD}px;
  height: ${SIZE_MD}px;
  margin-right: 8px;

  @media (min-width: 1024px) {
    width: ${SIZE_LG}px;
    height: ${SIZE_LG}px;
  }
`;

export const Header = styled.h3`
  display: flex;
  align-items: center;
  margin: 0.5em 0;
  text-transform: uppercase;
  padding: 1vmin;
  background-color: #f5f5f5;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`;
