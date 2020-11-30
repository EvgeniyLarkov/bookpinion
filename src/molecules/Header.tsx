import React from 'react';
import styled from 'styled-components';
import IconBlock from '../atoms/IconBlock';
import Search from '../atoms/Search';

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    
    padding-left: 128px;
    height: 130px;
    width: 1400px;
`;

const Wrapper = styled.div`
    display: inline-block;
    margin: auto 0;
`;

const Title = styled.h1`
    font-family: Roboto, Arial, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 48px;
    line-height: 56px;
    margin: 0;
    color: #212529;
`;
const SubTitle = styled.h3`
    font-family: Roboto, Arial, sans-serif;
    font-style: italic;
    font-weight: 300;
    font-size: 18px;
    margin: 0;
    line-height: 21px;
    color: #343A40;
`;

const Header: React.FC = () => (
  <StyledHeader>
    <Wrapper>
      <Title>Bookscore.</Title>
      <SubTitle>Share your opinion about favorite books</SubTitle>
    </Wrapper>
    <Wrapper>
      <Search />
      <IconBlock />
    </Wrapper>
  </StyledHeader>
);

export default Header;
