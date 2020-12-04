import React from 'react';
import styled from 'styled-components';
import { Chip, TitleBase } from '../atoms';

const Wrapper = styled.div`
    padding-top: 128px;
    padding-left: 128px;
    width: 1400px;
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
