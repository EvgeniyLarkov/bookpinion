import { createSelector } from 'reselect';
import { RootState } from '../redux/ducks';
import { ArticlesStates, BooksStates } from '../redux/ducks/types';
import C from '../validations/constants';

export const booksDataSelector = (
  state: RootState,
): typeof state.books.data => state.books.data;

export const booksStateSelector = (
  state: RootState,
): typeof state.books.state => state.books.state;

export const articlesDataSelector = (
  state: RootState,
): typeof state.articles.data => state.articles.data;

export const articlesStateSelector = (
  state: RootState,
): typeof state.articles.state => state.articles.state;

export const booksIdsSelector = (
  state: RootState,
): typeof state.books.allIDs => state.books.allIDs;

export const articlesIdsSelector = (
  state: RootState,
): typeof state.articles.allIDs => state.articles.allIDs;

export const totalArticlesSelector = (
  state: RootState,
): typeof state.meta.totalArticles => state.meta.totalArticles;

export const isArticlesFetching = createSelector([articlesStateSelector],
  (state) => state === ArticlesStates.pending);

export const isArticlesFetched = createSelector([articlesStateSelector],
  (state) => state === ArticlesStates.fetched);

export const isBooksFetching = createSelector([booksStateSelector],
  (state) => state === BooksStates.pending);

export const getArticles = createSelector([articlesDataSelector, articlesIdsSelector],
  (data, ids) => ids.map((id) => data[id]));

export const getBooks = createSelector([booksDataSelector, booksIdsSelector],
  (data, ids) => ids.map((id) => data[id]));

export const getExpectedArticles = createSelector([getArticles, isArticlesFetching],
  (articles, isFetching) => ((isFetching) ? Array(C.ARTICLES_PER_PAGE).fill(null) : articles));

export const getBooksSortedByArticles = createSelector([getExpectedArticles, booksDataSelector],
  (articles, books) => articles.map((article) => (article === null
    ? null
    : books[article.bookId] || null)));

export const getExpectedBooks = createSelector([getBooksSortedByArticles, isBooksFetching],
  (books, isFetching) => ((isFetching) ? Array(C.ARTICLES_PER_PAGE).fill(null) : books));

export const getMaxPage = createSelector([totalArticlesSelector],
  (value) => Math.ceil(value / C.ARTICLES_PER_PAGE));
