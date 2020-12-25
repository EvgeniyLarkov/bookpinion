import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { uniqueId } from 'lodash';
import { ErrorStatus, ServerErrorResponse } from './types';

// eslint-disable-next-line import/prefer-default-export
export function asyncFetchActionCreator<U, R>(
  actionName: string,
  func: (payload: R) => Promise<U>,
): AsyncThunk<U, R, {
    rejectValue: ServerErrorResponse<ErrorStatus>
  }> {
  return createAsyncThunk<U, R, {
    rejectValue: ServerErrorResponse<ErrorStatus>
  }>(
    actionName,
    async (payload, { rejectWithValue }) => {
      try {
        const response = await func(payload);
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
