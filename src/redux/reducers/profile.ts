import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { login } from '../../api/userApi';
import { ServerErrorResponse, ServerSuccessResponse } from '../../api/types';
import {
  Languages, LoginData, ProfileInfo, ProfileInterface, ProfileStates, ProfileStatusStates,
} from './types';

const loginThunk = createAsyncThunk<ServerSuccessResponse<ProfileInfo>, LoginData, {
  rejectValue: ServerErrorResponse
}>(
  'profile/fetchById',
  async ({ username, password }, { getState, rejectWithValue }) => {
    try {
      const { profile } = getState() as { profile: ProfileInterface };

      if (profile.state === ProfileStates.pending) {
        return rejectWithValue({ status: 'pending', errors: ['Requesting data'] });
      }

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
    login(state, action: PayloadAction<ProfileInfo>) {
      const { username, status } = action.payload;
      state.username = username;
      state.status = status;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
      const { name, surname, username } = payload.message;
      state.state = ProfileStates.logged;
      state.username = username;
      state.name = name;
      state.surname = surname;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      if (action.payload !== undefined) {
        state.error = action.payload.errors;
      }
      state.error = [action.error.message ?? 'Error'];
    });
    builder.addCase(loginThunk.pending, (state) => {
      state.state = ProfileStates.pending;
    });
  },
});

export const { login: loginAction } = profileSlice.actions;

export default profileSlice.reducer;
