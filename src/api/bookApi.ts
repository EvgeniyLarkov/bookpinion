import axios from 'axios';
import { BookGetResponse, ServerSuccessResponse } from './types';
import { AllIDs } from '../redux/ducks/types';
import routes from '../routes';

const fetchBookById = async (
  input: AllIDs,
): Promise<ServerSuccessResponse<BookGetResponse>> => {
  const data = await axios
    .get<ServerSuccessResponse<BookGetResponse>>(routes.bookPath(input))
    .then((response) => response.data);
  return data;
};

// eslint-disable-next-line import/prefer-default-export
export { fetchBookById };
