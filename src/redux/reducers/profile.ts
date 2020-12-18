import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { login } from '../../api/userApi';
import { ServerErrorResponse, ServerSuccessResponse } from '../../api/types';
import {
  Languages, LoginData, ProfileInfo, ProfileInterface, ProfileStates, ProfileStatusStates,
} from './types';

export const loginByUsername = createAsyncThunk<ServerSuccessResponse<ProfileInfo>, LoginData, {
  rejectValue: ServerErrorResponse
}>(
  'profile/loginByUsername',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      // const { profile } = getState() as { profile: ProfileInterface };

      /* if (profile.state === ProfileStates.pending) {
        return rejectWithValue({ status: 'pending', errors: ['Requesting data'] });
      } */

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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginByUsername.fulfilled, (state, { payload }) => {
      const { name, surname, username } = payload.message;
      state.state = ProfileStates.logged;
      state.username = username;
      state.name = name;
      state.surname = surname;
    });
    builder.addCase(loginByUsername.rejected, (state, action) => {
      if (action.payload !== undefined) {
        state.error = [...action.payload.errors];
      } else {
        state.error = [action.error.message ?? 'Error'];
      }
    });
    builder.addCase(loginByUsername.pending, (state) => {
      state.state = ProfileStates.pending;
    });
  },
});

export default profileSlice.reducer;
