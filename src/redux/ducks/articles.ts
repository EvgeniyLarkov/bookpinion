import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { asyncFetchActionCreator } from '../../api/asyncActions';
import { getArticles, postArticle } from '../../api/articleApi';
import { isValidationError } from '../../api/types';
import {
  ArticlePublishStates,
  ArticlesInterface,
  ArticlesStates,
  ValidationError,
} from './types';

const initialState: ArticlesInterface = {
  state: ArticlesStates.idle,
  publishState: ArticlePublishStates.idle,
  data: {},
  allIDs: [],
  error: [],
};

export const fetchArticles = asyncFetchActionCreator('articles/fetchArticles', getArticles);
export const publishArticle = asyncFetchActionCreator('articles/postArticle', postArticle);

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setArticleError(state, action: PayloadAction<ValidationError[]>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, { payload }) => {
      const {
        message,
      } = payload;

      const ids = message.data.map(({ id }) => id);
      state.allIDs = ids;

      message.data.forEach((article) => {
        state.data[article.id] = article;
      });

      state.state = ArticlesStates.fetched;
    });
    builder.addCase(fetchArticles.rejected, (state, { payload }) => {
      if (payload && isValidationError(payload)) {
        state.error = payload.errors;
      }
      state.state = ArticlesStates.idle;
    });
    builder.addCase(fetchArticles.pending, (state) => {
      state.state = ArticlesStates.pending;
    });
    builder.addCase(publishArticle.rejected, (state, { payload }) => {
      if (payload && isValidationError(payload)) {
        state.error.push(...payload.errors);
      }
      state.publishState = ArticlePublishStates.idle;
    });
    builder.addCase(publishArticle.fulfilled, (state) => {
      state.publishState = ArticlePublishStates.published;
    });
    builder.addCase(publishArticle.pending, (state) => {
      state.publishState = ArticlePublishStates.pending;
    });
  },
});

export const { setArticleError } = articlesSlice.actions;

export default articlesSlice.reducer;
