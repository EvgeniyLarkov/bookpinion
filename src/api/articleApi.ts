import axios from 'axios';
import { ArticleRequest, ServerSuccessResponse } from './types';
import { ExtendedArticleInterface, ArticleInterface } from '../redux/ducks/types';
import routes from '../routes';

const getArticles = async (
  input: ArticleRequest,
): Promise<ServerSuccessResponse<ExtendedArticleInterface<string>[]>> => {
  const data = await axios
    .get<ServerSuccessResponse<ExtendedArticleInterface<string>[]>>(routes.articlePath(
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
