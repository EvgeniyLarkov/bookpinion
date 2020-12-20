import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { login, register } from '../../api/userApi';
import {
  BaseUserInfo, ExtendedUserInfo, ServerErrorResponse, ServerSuccessResponse,
} from '../../api/types';
import {
  Languages, ProfileInfo, ProfileInterface, ProfileStates, ProfileStatusStates, ValidationError,
} from './types';

export const loginByUsername = createAsyncThunk<ServerSuccessResponse<ProfileInfo>, BaseUserInfo, {
  rejectValue: ServerErrorResponse
}>(
  'profile/loginByUsername',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await login({ username, password });
      return response;
    } catch (err) {
      const error: AxiosError<ServerErrorResponse> = err;
      if (error.response !== undefined) {
        return rejectWithValue(error.response.data);
      }
      if (error.request !== undefined) {
        return rejectWithValue(error.request);
      }
      throw err;
    }
  },
);

export const registerUser = createAsyncThunk<ServerSuccessResponse<ProfileInfo>, ExtendedUserInfo, {
  rejectValue: ServerErrorResponse
}>(
  'profile/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await register(userData);
      return response;
    } catch (err) {
      const error: AxiosError<ServerErrorResponse> = err;
      if (error.response !== undefined) {
        return rejectWithValue(error.response.data);
      }
      if (error.request !== undefined) {
        return rejectWithValue(error.request);
      }
      throw err;
    }
  },
);

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
      console.log(action);
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
