import { createSlice } from '@reduxjs/toolkit';
import { asyncFetchActionCreator } from '../../api/asyncActions';
import { fetchMetaData } from '../../api/metaApi';
import { fetchArticles } from './articles';
import { getBookById } from './books';
import { MetaInterface, MetaStates } from './types';

const initialState: MetaInterface = {
  state: MetaStates.idle,
  totalBooks: 0,
  totalArticles: 0,
  booksPreview: null,
  categories: null,
};

export const getMetaData = asyncFetchActionCreator('meta/fetchMetaData', fetchMetaData);

const metaSlice = createSlice({
  name: 'meta',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMetaData.fulfilled, (state, { payload }) => {
      const {
        message: {
          bookPreview,
          categories,
        },
      } = payload;

      state.booksPreview = bookPreview;
      state.categories = categories;

      state.state = MetaStates.fetched;
    });
    builder.addCase(fetchArticles.fulfilled, (state, { payload }) => {
      const { message: { totalArticles } } = payload;

      state.totalArticles = totalArticles;
    });
    builder.addCase(getBookById.fulfilled, (state, { payload }) => {
      const { message: { totalBooks } } = payload;

      state.totalBooks = totalBooks;
    });
    builder.addCase(getMetaData.pending, (state) => {
      state.state = MetaStates.pending;
    });
    builder.addCase(getMetaData.rejected, (state) => {
      state.state = MetaStates.idle;
    });
  },
});

export default metaSlice.reducer;
