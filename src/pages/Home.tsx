import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Header from '../molecules/Header';
import InputBlock from '../molecules/InputBlock';
import Filter from '../molecules/Filter';
import BookSection from '../molecules/BookSection';
import { Notification } from '../organisms';
import { AppDispatch } from '../redux/store';
import { RootState } from '../redux/ducks';
import { fetchArticles } from '../redux/ducks/articles';
import { getBookById } from '../redux/ducks/books';
import C from '../validations/constants';

const Body = styled.div`
  height: 100vh;
  background: ${(props) => props.theme.background};
`;

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [pageNumber] = useState(1);

  const { data: articlesData, allIDs: articlesIDs } = useSelector(({
    articles,
  }: RootState) => articles);
  const { data: booksData, allIDs: bookIDs } = useSelector(({ books }: RootState) => books);

  const articles = articlesIDs.map((id) => articlesData[id]);
  const books = bookIDs.map((id) => booksData[id]);

  useEffect(() => {
    const start = C.ARTICLES_PER_PAGE * (pageNumber - 1);
    const end = C.ARTICLES_PER_PAGE * (pageNumber - 1) + C.ARTICLES_PER_PAGE;
    dispatch(fetchArticles({ start, end }));
  }, [pageNumber]);

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
