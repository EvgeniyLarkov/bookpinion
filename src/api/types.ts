import {
  AllIDs,
  BookPreviewType,
  CategoryType,
  ExtendedArticleInterface,
  ExtendedBookInterface,
  ServerError,
  ValidationError,
} from '../redux/ducks/types';

export enum ErrorStatus {
  connerr = 'connection error',
  sererr = 'server errror',
  valerr = 'validation error',
}

export interface ServerSuccessResponse<T> {
  status: string
  message: T
  token?: string
}

export interface ServerErrorResponse<T> {
  status: T extends ErrorStatus.valerr
    ? ErrorStatus.valerr
    : T extends ErrorStatus.connerr
      ? ErrorStatus.connerr
      : ErrorStatus.sererr
  message?: string
  errors: T extends ErrorStatus.valerr
    ? ValidationError[]
    : ServerError
}

export function isValidationError(
  obj: ServerErrorResponse<ErrorStatus>,
): obj is ServerErrorResponse<ErrorStatus.valerr> {
  return obj.status === ErrorStatus.valerr;
}

export function isConnectionError(
  obj: ServerErrorResponse<ErrorStatus>,
): obj is ServerErrorResponse<ErrorStatus.connerr> {
  return obj.status === ErrorStatus.connerr;
}

export function isServerError(
  obj: ServerErrorResponse<ErrorStatus>,
): obj is ServerErrorResponse<ErrorStatus.sererr> {
  return obj.status === ErrorStatus.sererr;
}

export interface BaseUserInfo {
  username: string
  password: string
}

export interface ExtendedUserInfo extends BaseUserInfo {
  name: string
  surname: string
}

export interface ArticleRequest {
  id?: AllIDs,
  start?: number,
  end?: number,
}

export interface ArticleGetResponse {
  data: ExtendedArticleInterface<AllIDs>[]
  totalArticles: number
}

export interface BookGetResponse {
  data: ExtendedBookInterface<AllIDs>[]
  totalBooks: number
}

export interface MetaGetResponse {
  categories: CategoryType[],
  bookPreview: BookPreviewType[]
}
