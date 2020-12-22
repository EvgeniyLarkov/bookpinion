import { combineReducers } from '@reduxjs/toolkit';
import profileSlice from './profile';
import modalSlice from './modal';
import booksSlice from './books';
import errorsSlice from './errors';

const rootReducer = combineReducers({
  profile: profileSlice,
  modal: modalSlice,
  books: booksSlice,
  errors: errorsSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
