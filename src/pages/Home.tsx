import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { isNull } from 'lodash';
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
import { ArticlesStates } from '../redux/ducks/types';
import BaseModal from '../molecules/Modal';

const Body = styled.div`
  height: 100vh;
  box-sizing: border-box;
  background: ${(props) => props.theme.background};
`;

const Wrapper = styled.div`
  @media screen and (min-width: 60em) { // 960px
    padding: 0 32px;
  }

  @media screen and (min-width: 75em) { // 1200px
    padding: 0 64px;
  }

  @media screen and (min-width: 100em) { // 1600px
    padding-left: 128px;
    width: 1400px;
  }
`;

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [pageNumber, setPage] = useState(1);

  const { data: articlesData, allIDs: articlesIDs, state: articlesState } = useSelector(({
    articles,
  }: RootState) => articles);
  const { data: booksData, allIDs: bookIDs } = useSelector(({ books }: RootState) => books);

  const articles = (articlesState === ArticlesStates.fetched)
    ? articlesIDs.map((id) => articlesData[id])
    : Array(C.ARTICLES_PER_PAGE).fill(null);
  const allBooks = bookIDs.map((id) => booksData[id]);
  console.log(articles);
  const books = articles.map((article) => (!isNull(article)
    ? allBooks.find(({ id }) => id === article.bookId) || null
    : null));

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
      <Wrapper>
        <Header />
        <InputBlock />
        <Filter />
        <BookSection
          books={books}
          articles={articles}
          pageNumber={pageNumber}
          setPage={setPage}
        />
        <Notification />
        <BaseModal />
      </Wrapper>
    </Body>
  );
};

export default Home;
