import { createSelector } from 'reselect';
import { RootState } from '../redux/ducks';
import {
  ArticlePublishStates,
  ArticlesStates,
  BooksStates,
  ErrorsStates,
  ProfileStates,
  ProfileStatusStates,
  NotificationStates,
} from '../redux/ducks/types';
import C from '../validations/constants';
import { normalizeValidationErrors } from './index';

export const profileStatusSelector = (
  state: RootState,
): typeof state.profile.status => state.profile.status;

export const profileStateSelector = (
  state: RootState,
): typeof state.profile.state => state.profile.state;

export const profileNameSelector = (
  state: RootState,
): typeof state.profile.name => state.profile.name;

export const profileErrorsSelector = (
  state: RootState,
): typeof state.profile.error => state.profile.error;

export const booksDataSelector = (
  state: RootState,
): typeof state.books.data => state.books.data;

export const booksStateSelector = (
  state: RootState,
): typeof state.books.state => state.books.state;

export const booksIdsSelector = (
  state: RootState,
): typeof state.books.allIDs => state.books.allIDs;

export const articlesDataSelector = (
  state: RootState,
): typeof state.articles.data => state.articles.data;

export const articlesStateSelector = (
  state: RootState,
): typeof state.articles.state => state.articles.state;

export const articlesPublishStateSelector = (
  state: RootState,
): typeof state.articles.publishState => state.articles.publishState;

export const articlesErrorsSelector = (
  state: RootState,
): typeof state.articles.error => state.articles.error;

export const articlesIdsSelector = (
  state: RootState,
): typeof state.articles.allIDs => state.articles.allIDs;

export const totalArticlesSelector = (
  state: RootState,
): typeof state.meta.totalArticles => state.meta.totalArticles;

export const booksPreviewSelector = (
  state: RootState,
): typeof state.meta.booksPreview => state.meta.booksPreview;

export const errorsStateSelector = (
  state: RootState,
): typeof state.errors.state => state.errors.state;

export const errorsDataSelector = (
  state: RootState,
): typeof state.errors.data => state.errors.data;

export const notificationsStateSelector = (
  state: RootState,
): typeof state.notifications.state => state.notifications.state;

export const notificationsDataSelector = (
  state: RootState,
): typeof state.notifications.data => state.notifications.data;

export const isUserAdmin = createSelector([profileStatusSelector],
  (state) => state === ProfileStatusStates.admin);

export const isUserLogged = createSelector([profileStateSelector],
  (state) => state === ProfileStates.logged);

export const isProfileFetching = createSelector([profileStateSelector],
  (state) => state === ProfileStates.pending);

export const isProfileFetched = createSelector([profileStateSelector],
  (state) => state === ProfileStates.logged);

export const isArticlesFetching = createSelector([articlesStateSelector],
  (state) => state === ArticlesStates.pending);

export const isArticlesFetched = createSelector([articlesStateSelector],
  (state) => state === ArticlesStates.fetched);

export const isArticlePublishPending = createSelector([articlesPublishStateSelector],
  (state) => state === ArticlePublishStates.pending);

export const isArticlePublished = createSelector([articlesPublishStateSelector],
  (state) => state === ArticlePublishStates.published);

export const isBooksFetching = createSelector([booksStateSelector],
  (state) => state === BooksStates.pending);

export const isErrorsFull = createSelector([errorsStateSelector],
  (state) => state === ErrorsStates.full);

export const isNotificationsFull = createSelector([notificationsStateSelector],
  (state) => state === NotificationStates.full);

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

export const getNormilizedProfileErrors = createSelector([profileErrorsSelector],
  (errors) => normalizeValidationErrors(errors));

export const getNormilizedArticleErrors = createSelector([articlesErrorsSelector],
  (errors) => normalizeValidationErrors(errors));
