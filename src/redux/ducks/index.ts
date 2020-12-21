import { combineReducers } from '@reduxjs/toolkit';
import profileSlice from './profile';
import modalSlice from './modal';

const rootReducer = combineReducers({
  profile: profileSlice,
  modal: modalSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
