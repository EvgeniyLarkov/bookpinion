import axios from 'axios';
import { ArticleGetResponse, ArticleRequest, ServerSuccessResponse } from './types';
import { ArticleInterface } from '../redux/ducks/types';
import routes from '../routes';

const getArticles = async (
  input: ArticleRequest,
): Promise<ServerSuccessResponse<ArticleGetResponse>> => {
  const data = await axios
    .get<ServerSuccessResponse<ArticleGetResponse>>(routes.articlePath(
    input.id,
    input.start,
    input.end,
  ))
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
