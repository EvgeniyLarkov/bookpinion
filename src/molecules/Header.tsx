import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { IconBlock, Search, TitleBase } from '../atoms';
import BaseModal from './Modal';
import LoginForm from '../atoms/LoginForm';

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

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <StyledHeader>
      <Wrapper>
        <Title as="h1">Bookpinion.</Title>
        <SubTitle as="h3">{t('subTitle')}</SubTitle>
      </Wrapper>
      <Wrapper>
        <Search />
        <IconBlock />
        <BaseModal>
          <LoginForm />
        </BaseModal>
      </Wrapper>
    </StyledHeader>
  );
};

export default Header;
