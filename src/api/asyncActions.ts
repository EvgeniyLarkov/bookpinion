import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { uniqueId } from 'lodash';
import type { RootState } from '../redux/ducks';
import { ErrorStatus, ServerErrorResponse } from './types';

// eslint-disable-next-line import/prefer-default-export
export function asyncFetchActionCreator<U, R>(
  actionName: string,
  func: (payload: R, options?: AxiosRequestConfig) => Promise<U>,
): AsyncThunk<U, R, {
    rejectValue: ServerErrorResponse<ErrorStatus>
  }> {
  return createAsyncThunk<U, R, {
    rejectValue: ServerErrorResponse<ErrorStatus>
  }>(
    actionName,
    async (payload, { rejectWithValue, getState }) => {
      try {
        const state = getState() as RootState;
        const { token } = state.profile;

        const options: AxiosRequestConfig = {
          headers: {
            Authorization: (token) ? `Bearer ${token}` : null,
          },
        };

        const response = await func(payload, options);
        return response;
      } catch (err) {
        const error: AxiosError<ServerErrorResponse<ErrorStatus>> = err;
        if (error.response !== undefined) {
          return rejectWithValue(error.response.data);
        }
        return rejectWithValue({
          status: ErrorStatus.connerr,
          errors: {
            id: uniqueId('connerr'),
            msg: 'unable to connect to the remote server',
          },
        });
      }
    },
  );
}
