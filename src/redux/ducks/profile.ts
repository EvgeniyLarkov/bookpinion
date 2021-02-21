import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, register, changeUserLanguage } from '../../api/userApi';
import { asyncFetchActionCreator } from '../../api/asyncActions';
import {
  ProfileInterface, ProfileStates, ProfileStatusStates, ValidationError,
} from './types';
import { isValidationError } from '../../api/types';

// TO-DO:
// 4. Добавить ошибки с бека

export const loginByUsername = asyncFetchActionCreator('profile/loginByUsername', login);
export const registerUser = asyncFetchActionCreator('profile/registerUser', register);
export const changeLanguage = createAsyncThunk('profile/changeLanguage', changeUserLanguage);

const initialState: ProfileInterface = {
  language: 'en',
  username: null,
  name: 'guest',
  surname: null,
  state: ProfileStates.idle,
  status: ProfileStatusStates.guest,
  token: null,
  error: [],
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setErrors(state, action: PayloadAction<ValidationError[]>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginByUsername.fulfilled, (state, { payload }) => {
      const {
        name, surname, username, token,
      } = payload.message;
      state.state = ProfileStates.logged;
      state.username = username;
      state.name = name;
      state.surname = surname;
      state.token = token;
    });
    builder.addCase(loginByUsername.rejected, (state, { payload }) => {
      if (payload && isValidationError(payload)) {
        state.error = payload.errors;
      }
    });
    builder.addCase(loginByUsername.pending, (state) => {
      state.state = ProfileStates.pending;
      state.error = [];
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      const {
        name, surname, username, token,
      } = payload.message;
      state.state = ProfileStates.logged;
      state.username = username;
      state.name = name;
      state.surname = surname;
      state.token = token;
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      if (payload && isValidationError(payload)) {
        state.error = payload.errors;
      }
      state.state = ProfileStates.idle;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.state = ProfileStates.pending;
      state.error = [];
    });
    builder.addCase(changeLanguage.fulfilled, (state, { payload }) => {
      state.language = payload;
    });
  },
});

export const { setErrors } = profileSlice.actions;

export default profileSlice.reducer;
