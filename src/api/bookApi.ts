import axios, { AxiosRequestConfig } from 'axios';
import { BookGetResponse, BookRequest, ServerSuccessResponse } from './types';
import { ExtendedBookInterface } from '../redux/ducks/types';
import paths from '../paths';

export const fetchBookById = async (
  input: BookRequest,
): Promise<ServerSuccessResponse<BookGetResponse>> => {
  const data = await axios
    .get<ServerSuccessResponse<BookGetResponse>>(paths.bookPath(input))
    .then((response) => response.data);
  return data;
};

export const updateBook = async (
  input: Partial<ExtendedBookInterface<string>> & Pick<ExtendedBookInterface<string>, 'id'>,
  options: AxiosRequestConfig = {},
): Promise<ServerSuccessResponse<BookGetResponse>> => {
  const data = await axios
    .put<ServerSuccessResponse<BookGetResponse>>(
    paths.bookUpdatePath({ id: input.id }),
    input,
    options,
  )
    .then((response) => response.data);
  return data;
};
