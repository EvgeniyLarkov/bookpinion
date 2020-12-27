import { createSlice } from '@reduxjs/toolkit';
import { asyncFetchActionCreator } from '../../api/asyncActions';
import { getArticles } from '../../api/articleApi';
import { isValidationError } from '../../api/types';
import { ArticlesInterface, ArticlesStates } from './types';

const initialState: ArticlesInterface = {
  state: ArticlesStates.idle,
  data: {},
  allIDs: [],
  error: [],
};

export const fetchArticles = asyncFetchActionCreator('articles/fetchArticles', getArticles);

const booksSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, { payload }) => {
      const {
        message,
      } = payload;
      state.allIDs.push(message.id);
      state.data[message.id] = message;
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
  },
});

export default booksSlice.reducer;
