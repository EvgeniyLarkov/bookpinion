import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TitleBase } from '../atoms';
import { IconBlock } from '../molecules';

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    height: 130px;
`;

const Wrapper = styled.div`
    display: inline-block;
    margin: auto 0;
`;

const Title = styled(TitleBase)`
    display: block;
    font-weight: 500;
    font-size: 48px;
    line-height: 1.2;
    padding: 0;
`;

const SubTitle = styled(TitleBase)`
    display: block;
    font-style: italic;
    font-weight: 300;
    font-size: 18px;
    line-height: 1.2;
    padding: 0;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`;

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <StyledHeader>
      <Wrapper>
        <StyledLink to="/">
          <Title as="h1">Bookpinion.</Title>
        </StyledLink>
        <SubTitle as="h3">{t('subTitle')}</SubTitle>
      </Wrapper>
      <Wrapper>
        <IconBlock />
      </Wrapper>
    </StyledHeader>
  );
};

export default Header;
