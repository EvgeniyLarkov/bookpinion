import { combineReducers } from '@reduxjs/toolkit';
import profileSlice from './profile';
import modalSlice from './modal';
import booksSlice from './books';
import errorsSlice from './errors';
import articlesSlice from './articles';
import metaSlice from './meta';

const rootReducer = combineReducers({
  profile: profileSlice,
  modal: modalSlice,
  books: booksSlice,
  errors: errorsSlice,
  articles: articlesSlice,
  meta: metaSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
