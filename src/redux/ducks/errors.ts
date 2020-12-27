import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isServerError, isConnectionError } from '../../api/types';
import { getBookById } from './books';
import { loginByUsername, registerUser } from './profile';
import { ErrorsInterface, ErrorsStates } from './types';

const initialState: ErrorsInterface = {
  state: ErrorsStates.idle,
  data: [],
};

const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    remove(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      const index = state.data.findIndex((data) => data.id === id);
      if (index !== -1) {
        state.data.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBookById.rejected, (state, { payload }) => {
      if (payload && (isServerError(payload) || isConnectionError(payload))) {
        const message = `${payload.status.toLocaleUpperCase()}: ${payload.errors.msg}`;
        state.data.push({ msg: message, id: payload.errors.id });
      }
      state.state = ErrorsStates.full;
    });
    builder.addCase(loginByUsername.rejected, (state, { payload }) => {
      if (payload && (isServerError(payload) || isConnectionError(payload))) {
        const message = `${payload.status.toLocaleUpperCase()}: ${payload.errors.msg}`;
        state.data.push({ msg: message, id: payload.errors.id });
      }
      state.state = ErrorsStates.full;
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      if (payload && (isServerError(payload) || isConnectionError(payload))) {
        const message = `${payload.status.toLocaleUpperCase()}: ${payload.errors.msg}`;
        state.data.push({ msg: message, id: payload.errors.id });
      }
      state.state = ErrorsStates.full;
    });
  },
});

export const { remove: removeError } = errorsSlice.actions;

export default errorsSlice.reducer;
