import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, register } from '../../api/userApi';
import { asyncFetchActionCreator } from '../../api/asyncActions';
import {
  Languages, ProfileInterface, ProfileStates, ProfileStatusStates, ValidationError,
} from './types';

// TO-DO:
// 2. Возможно привести к одному виду интерфейс пользователя в редьюсере, компоненте и беке
// 3. Исправить краш при отсутсвии соединения с беком
// 4. Добавить ошибки с бека

export const loginByUsername = asyncFetchActionCreator('profile/loginByUsername', login);
export const registerUser = asyncFetchActionCreator('profile/registerUser', register);

const initialState: ProfileInterface = {
  language: Languages.en,
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
    builder.addCase(loginByUsername.rejected, (state, action) => {
      if (action.payload !== undefined) {
        state.error = [...action.payload.errors];
      } else {
        state.error = [{ msg: action.error.message || 'Connection error', param: 'request' }];
      }
      state.state = ProfileStates.idle;
    });
    builder.addCase(loginByUsername.pending, (state) => {
      state.state = ProfileStates.pending;
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
    builder.addCase(registerUser.rejected, (state, action) => {
      if (action.payload !== undefined) {
        state.error = [...action.payload.errors];
      } else {
        state.error = [{ msg: action.error.message || 'Connection error', param: 'request' }];
      }
      state.state = ProfileStates.idle;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.state = ProfileStates.pending;
    });
  },
});

export const { setErrors } = profileSlice.actions;

export default profileSlice.reducer;
