export enum ProfileStatusStates {
  'admin',
  'user',
  'guest',
}

export enum ProfileStates {
  'idle',
  'pending',
  'logged',
}

export enum BooksStates {
  'idle',
  'pending',
  'fetched',
}

export enum ArticlesStates {
  'idle',
  'pending',
  'fetched',
}

export enum ErrorsStates {
  'idle',
  'full',
}

export enum ModalVariants {
  'login',
  'registration',
}

export enum ProfileFields {
  username = 'username',
  firstname = 'firstname',
  lastname = 'lastname',
  password = 'password',
}

export enum ArticleFields {
  article = 'article',
}

export type AllIDs = string;

export interface ProfileInfo {
  username: string | null
  name: string
  surname: string | null
  status: ProfileStatusStates
  token: string | null
}

export interface ProfileInterface extends ProfileInfo {
  language: string
  state: ProfileStates
  error: ValidationError[]
}

export interface BookInterface {
  authors: string[]
  title: string
}

export interface ExtendedBookInterface<K> extends BookInterface {
  authors: string[]
  id: K
  title: string
  description: string
  imageLinks: { small: string, normal: string }
  link: string
}

export type BookPreviewType = {
  _id: string;
  authors: string[];
  title: string;
};

export interface BooksInterface {
  state: BooksStates,
  data: { [K in AllIDs]: ExtendedBookInterface<K>},
  preview: BookPreviewType[],
  allIDs: AllIDs[],
  error: ValidationError[] | ServerError[],
}

export interface ArticleInterface {
  bookId: string
  article: string
  rating: number
}

export interface ExtendedArticleInterface<K> extends ArticleInterface {
  id: K
  username: string
  title: string
  authors: string[]
  createdAt: Date
}

export interface ArticlesInterface {
  state: ArticlesStates,
  data: { [K in AllIDs]: ExtendedArticleInterface<K>},
  allIDs: AllIDs[],
  error: ValidationError[],
}

export interface ValidationError {
  param: string
  msg: string
}

export type ServerError = {
  msg: string
  [id: string]: string
};

export interface ErrorsInterface {
  state: ErrorsStates
  data: ServerError[]
}
