import { createSlice } from '@reduxjs/toolkit';
import { asyncFetchActionCreator } from '../../api/asyncActions';
import { getBookById } from '../../api/bookApi';
import { isValidationError } from '../../api/types';
import { BooksInterface, BooksStates } from './types';

const initialState: BooksInterface = {
  state: BooksStates.idle,
  data: {},
  allIDs: [],
  error: [],
};

export const fetchBooks = asyncFetchActionCreator('books/fetchBooks', getBookById);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.fulfilled, (state, { payload }) => {
      const {
        message,
      } = payload;
      state.allIDs.push(message.id);
      state.data[message.id] = message;
      state.state = BooksStates.fetched;
    });
    builder.addCase(fetchBooks.rejected, (state, { payload }) => {
      if (payload && isValidationError(payload)) {
        state.error = payload.errors;
      }
      state.state = BooksStates.idle;
    });
    builder.addCase(fetchBooks.pending, (state) => {
      state.state = BooksStates.pending;
    });
  },
});

export default booksSlice.reducer;
