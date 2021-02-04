import { createSlice } from '@reduxjs/toolkit';
import { asyncFetchActionCreator } from '../../api/asyncActions';
import { fetchBookById, fetchPreviewData } from '../../api/bookApi';
import { isValidationError } from '../../api/types';
import { BooksInterface, BooksStates } from './types';

const initialState: BooksInterface = {
  state: BooksStates.idle,
  data: {},
  preview: [],
  allIDs: [],
  error: [],
};

export const getBookById = asyncFetchActionCreator('books/fetchBooks', fetchBookById);
export const getPreviewData = asyncFetchActionCreator('books/getPreviewData', fetchPreviewData);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBookById.fulfilled, (state, { payload }) => {
      const {
        message,
      } = payload;
      state.allIDs.push(message.id);
      state.data[message.id] = message;
      state.state = BooksStates.fetched;
    });
    builder.addCase(getBookById.rejected, (state, { payload }) => {
      if (payload && isValidationError(payload)) {
        state.error = payload.errors;
      }
      state.state = BooksStates.idle;
    });
    builder.addCase(getBookById.pending, (state) => {
      state.state = BooksStates.pending;
    });
    builder.addCase(getPreviewData.fulfilled, (state, { payload }) => {
      const {
        message,
      } = payload;
      state.preview = message;
      state.state = BooksStates.fetched;
    });
    builder.addCase(getPreviewData.rejected, (state, { payload }) => {
      if (payload && isValidationError(payload)) {
        state.error = payload.errors;
      }
      state.state = BooksStates.idle;
    });
  },
});

export default booksSlice.reducer;
