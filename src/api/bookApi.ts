import axios from 'axios';
import { ServerSuccessResponse } from './types';
import { AllIDs, ExtendedBookInterface } from '../redux/ducks/types';
import routes from '../routes';

const fetchBookById = async (
  input: AllIDs,
): Promise<ServerSuccessResponse<ExtendedBookInterface<AllIDs>>> => {
  const data = await axios
    .get<ServerSuccessResponse<ExtendedBookInterface<AllIDs>>>(routes.bookPath(input))
    .then((response) => response.data);
  return data;
};

// eslint-disable-next-line import/prefer-default-export
export { fetchBookById };
