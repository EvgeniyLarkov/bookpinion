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

export enum ArticlePublishStates {
  'idle',
  'pending',
  'published',
}

export enum MetaStates {
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
  'updateBookData',
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

export type CategoryType = string;

export interface ProfileInfo {
  username: string | null
  name: string
  surname: string | null
  status: ProfileStatusStates
  token: string | null
  isAdmin: boolean
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
  id: K
  description: string
  category?: string[]
  imageLinks: { small: string, normal: string, big?: string }
  link: string
}

export type BookPreviewType = {
  id: string;
  authors: string[];
  title: string;
};

export interface BooksInterface {
  state: BooksStates,
  data: { [K in AllIDs]: ExtendedBookInterface<K>},
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
  publishState: ArticlePublishStates,
  data: { [K in AllIDs]: ExtendedArticleInterface<K>},
  allIDs: AllIDs[],
  error: ValidationError[],
}

export interface MetaInterface {
  state: MetaStates,
  totalBooks: number,
  totalArticles: number,
  booksPreview: BookPreviewType[] | null,
  categories: CategoryType[] | null
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
