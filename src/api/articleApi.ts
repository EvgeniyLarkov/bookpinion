import axios from 'axios';
import { ServerSuccessResponse } from './types';
import { AllIDs, ExtendedArticleInterface, ArticleInterface } from '../redux/ducks/types';
import routes from '../routes';

const getArticles = async (
  input?: AllIDs,
): Promise<ServerSuccessResponse<ExtendedArticleInterface<AllIDs>>> => {
  const data = await axios
    .get<ServerSuccessResponse<ExtendedArticleInterface<AllIDs>>>(routes.articlePath(input))
    .then((response) => response.data);
  return data;
};

const postArticle = async (
  input: ArticleInterface,
): Promise<ServerSuccessResponse<ArticleInterface>> => {
  const data = await axios
    .post<ServerSuccessResponse<ArticleInterface>>(routes.articlePath(), input)
    .then((response) => response.data);
  return data;
};

export { getArticles, postArticle };
