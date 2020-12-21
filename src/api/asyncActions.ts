import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ServerErrorResponse } from './types';

// eslint-disable-next-line import/prefer-default-export
export function asyncFetchActionCreator<U, R>(
  actionName: string,
  func: (payload: R) => Promise<U>,
): AsyncThunk<U, R, {
    rejectValue: ServerErrorResponse
  }> {
  return createAsyncThunk<U, R, {
    rejectValue: ServerErrorResponse
  }>(
    actionName,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await func(payload);
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
}
