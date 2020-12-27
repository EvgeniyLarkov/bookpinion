import axios from 'axios';
import { ServerSuccessResponse } from './types';
import { AllIDs, ArticleInterface } from '../redux/ducks/types';
import routes from '../routes';

const getArticles = async (
  input?: AllIDs,
): Promise<ServerSuccessResponse<ArticleInterface<AllIDs>>> => {
  const data = await axios
    .get<ServerSuccessResponse<ArticleInterface<AllIDs>>>(routes.articlePath(input))
    .then((response) => response.data);
  return data;
};

// eslint-disable-next-line import/prefer-default-export
export { getArticles };
