import axios from 'axios';
import { ServerSuccessResponse } from './types';
import { AllIDs, ExtendedBookInterface, BookPreviewType } from '../redux/ducks/types';
import routes from '../routes';

const fetchBookById = async (
  input: AllIDs,
): Promise<ServerSuccessResponse<ExtendedBookInterface<AllIDs>>> => {
  const data = await axios
    .get<ServerSuccessResponse<ExtendedBookInterface<AllIDs>>>(routes.bookPath(input))
    .then((response) => response.data);
  return data;
};

const fetchPreviewData = async (): Promise<ServerSuccessResponse<BookPreviewType[]>> => {
  const data = await axios
    .get<ServerSuccessResponse<BookPreviewType[]>>(routes.bookPreviewPath())
    .then((response) => response.data);
  return data;
};

export { fetchBookById, fetchPreviewData };
