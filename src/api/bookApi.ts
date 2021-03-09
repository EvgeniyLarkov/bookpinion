import axios from 'axios';
import { BookGetResponse, BookRequest, ServerSuccessResponse } from './types';
import paths from '../paths';

const fetchBookById = async (
  input: BookRequest,
): Promise<ServerSuccessResponse<BookGetResponse>> => {
  const data = await axios
    .get<ServerSuccessResponse<BookGetResponse>>(paths.bookPath(input))
    .then((response) => response.data);
  return data;
};

// eslint-disable-next-line import/prefer-default-export
export { fetchBookById };
