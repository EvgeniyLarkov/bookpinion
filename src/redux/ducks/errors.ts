import { createSlice } from '@reduxjs/toolkit';
import { isServerError, isConnectionError } from '../../api/types';
import { fetchBooks } from './books';
import { loginByUsername, registerUser } from './profile';
import { ErrorsInterface, ErrorsStates } from './types';

const initialState: ErrorsInterface = {
  state: ErrorsStates.idle,
  data: [],
};

const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.rejected, (state, { payload }) => {
      if (payload && (isServerError(payload) || isConnectionError(payload))) {
        state.data.push(...payload.errors);
      }
      state.state = ErrorsStates.full;
    });
    builder.addCase(loginByUsername.rejected, (state, { payload }) => {
      if (payload && (isServerError(payload) || isConnectionError(payload))) {
        state.data.push(...payload.errors);
      }
      state.state = ErrorsStates.full;
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      if (payload && (isServerError(payload) || isConnectionError(payload))) {
        state.data.push(...payload.errors);
      }
      state.state = ErrorsStates.full;
    });
  },
});

export default errorsSlice.reducer;
