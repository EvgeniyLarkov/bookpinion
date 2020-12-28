import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Header from '../molecules/Header';
import InputBlock from '../molecules/InputBlock';
import Filter from '../molecules/Filter';
import BookSection from '../molecules/BookSection';
import { Notification } from '../organisms';
import { AppDispatch } from '../redux/store';
import { RootState } from '../redux/ducks';
// import { fetchArticles } from '../redux/ducks/articles';
import { getBookById } from '../redux/ducks/books';

const Body = styled.div`
  height: 100vh;
  background: ${(props) => props.theme.background};
`;

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data: articlesData, allIDs: articlesIDs } = useSelector(({
    articles,
  }: RootState) => articles);
  const { data: booksData, allIDs: bookIDs } = useSelector(({ books }: RootState) => books);

  const articles = articlesIDs.map((id) => articlesData[id]);
  const books = bookIDs.map((id) => booksData[id]);

  /* useEffect(() => {
    dispatch(fetchArticles());
  }, []); */

  useEffect(() => {
    const ids = articlesIDs.map(((item) => articlesData[item].bookId));
    ids.forEach((id) => dispatch(getBookById(id)));
  }, [articlesIDs]);

  return (
    <Body>
      <Header />
      <InputBlock />
      <Filter />
      <BookSection books={books} articles={articles} />
      <Notification />
    </Body>
  );
};

export default Home;
