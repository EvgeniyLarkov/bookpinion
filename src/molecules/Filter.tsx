import React from 'react';
import styled from 'styled-components';
import Chip from '../atoms/Chip';
import Title from '../atoms/TitleBase';

const Wrapper = styled.div`
    padding-top: 128px;
    padding-left: 128px;
    width: 1400px;
`;

const Filter: React.FC = () => (
  <Wrapper>
    <Title>Top books & opinions:</Title>
    <div>
      <Chip>Russian</Chip>
    </div>
  </Wrapper>
);

export default Filter;
