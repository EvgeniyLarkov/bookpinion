import React from 'react';
import styled from 'styled-components';
import Header from '../molecules/Header';
import InputBlock from '../molecules/InputBlock';
import Filter from '../molecules/Filter';
import BookSection from '../molecules/BookSection';
import { Notification } from '../organisms';

const Body = styled.div`
  height: 100vh;
  background: ${(props) => props.theme.background};
`;

const Home: React.FC = () => (
  <Body>
    <Header />
    <InputBlock />
    <Filter />
    <BookSection />
    <Notification />
  </Body>
);

export default Home;
