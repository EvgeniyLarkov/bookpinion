import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Header from '../molecules/Header';
import InputBlock from '../molecules/InputBlock';
import Filter from '../molecules/Filter';
import BookSection from '../molecules/BookSection';
import C from '../validations/constants';
import { Notification } from '../organisms';
import { AppDispatch } from '../redux/store';
import { RootState } from '../redux/ducks';
import { fetchArticles } from '../redux/ducks/articles';
import ChangePage from '../organisms/ChangePage';
import { getBookById } from '../redux/ducks/books';
import BaseModal from '../molecules/Modal';
import Template from './Template';
import { getMetaData } from '../redux/ducks/meta';
import TitleBase from '../atoms/TitleBase';
import {
  getExpectedArticles, getExpectedBooks, getMaxPage, isArticlesFetched,
} from '../utils/selectors';

// TO-DO
// History криво работает, добавить связь между query и view
// Нужен рефактор

const Wrapper = styled.div`
    padding-top: 36px;

    @media screen and (min-width: 60em) {
      padding-top: 128px;
    }
`;

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();

  const { path } = useRouteMatch();
  const history = useHistory();

  const [state, setState] = useState<{ pageNumber: number, activeCategory: string | null}>({
    pageNumber: 1,
    activeCategory: null,
  });

  const articles = useSelector(getExpectedArticles);
  const books = useSelector(getExpectedBooks);
  const maxPage = useSelector(getMaxPage);
  const isFetched = useSelector(isArticlesFetched);
  const categories = useSelector(({ meta }: RootState) => meta.categories);

  const setActiveCategory = (category: string | null) => {
    setState({ pageNumber: 1, activeCategory: category });
  };

  const setPage = (page: number) => {
    setState({ ...state, pageNumber: page });
  };

  useEffect(() => {
    dispatch(getMetaData(''));
  }, []);

  useEffect(() => {
    const start = C.ARTICLES_PER_PAGE * (state.pageNumber - 1);
    const end = C.ARTICLES_PER_PAGE * (state.pageNumber - 1) + C.ARTICLES_PER_PAGE;
    const params = {
      start: start.toString(),
      end: end.toString(),
    };
    const req = state.activeCategory ? { ...params, category: state.activeCategory } : params;

    dispatch(fetchArticles(req));
  }, [state.pageNumber, state.activeCategory]);

  useEffect(() => {
    if (isFetched) {
      const ids = articles.map(((item) => item.bookId));
      dispatch(getBookById({ id: ids.map((id) => ['id', id]) }));
    }
  }, [articles]);

  useEffect(() => {
    if (state.activeCategory !== null) {
      const search = new URLSearchParams(({ category: state.activeCategory }));
      history.push({
        pathname: path,
        search: `?${search}`,
      });
    } else {
      history.push({
        pathname: path,
      });
    }
  }, [state.activeCategory]);

  return (
    <Template>
      <Header />
      <InputBlock />
      <Wrapper>
        <TitleBase>{t('bookSectionLabel')}</TitleBase>
      </Wrapper>
      <Filter
        activeCategory={state.activeCategory}
        setActiveCategory={setActiveCategory}
        categories={categories}
      />
      <BookSection
        books={books}
        articles={articles}
      />
      <ChangePage
        pageNumber={state.pageNumber}
        maxPage={maxPage}
        setPage={setPage}
      />
      <Notification />
      <BaseModal />
    </Template>
  );
};

export default Home;
