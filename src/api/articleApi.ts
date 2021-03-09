import axios from 'axios';
import { ArticleGetResponse, ArticleRequest, ServerSuccessResponse } from './types';
import { ArticleInterface } from '../redux/ducks/types';
import paths from '../paths';

const getArticles = async (
  input: ArticleRequest,
): Promise<ServerSuccessResponse<ArticleGetResponse>> => {
  const data = await axios
    .get<ServerSuccessResponse<ArticleGetResponse>>(paths.articlePath(
    input,
  ))
    .then((response) => response.data);
  return data;
};

const postArticle = async (
  input: ArticleInterface,
): Promise<ServerSuccessResponse<ArticleInterface>> => {
  const data = await axios
    .post<ServerSuccessResponse<ArticleInterface>>(paths.articlePath(), input)
    .then((response) => response.data);
  return data;
};

export { getArticles, postArticle };
