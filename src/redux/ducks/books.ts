import { createSlice } from '@reduxjs/toolkit';
import { asyncFetchActionCreator } from '../../api/asyncActions';
import { fetchBookById, updateBook } from '../../api/bookApi';
import { isValidationError } from '../../api/types';
import { BooksInterface, BooksStates } from './types';

const initialState: BooksInterface = {
  state: BooksStates.idle,
  data: {},
  allIDs: [],
  error: [],
};

export const getBookById = asyncFetchActionCreator('books/fetchBooks', fetchBookById);
export const updateBookById = asyncFetchActionCreator('books/updateBook', updateBook);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBookById.fulfilled, (state, { payload }) => {
      const {
        message: {
          data,
        },
      } = payload;

      state.allIDs = data.map(({ id }) => id);

      data.forEach((book) => {
        state.data[book.id] = book;
      });

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
  },
});

export default booksSlice.reducer;
