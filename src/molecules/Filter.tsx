import React from 'react';
import styled from 'styled-components';
import { Chip, TitleBase } from '../atoms';

const Wrapper = styled.div`
    padding-top: 36px;

    @media screen and (min-width: 60em) {
      padding-top: 128px;
    }
`;

const Filter: React.FC = () => (
  <Wrapper>
    <TitleBase>Top books & opinions:</TitleBase>
    <div>
      <Chip>Russian</Chip>
    </div>
  </Wrapper>
);

export default Filter;
