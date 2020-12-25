export enum ProfileStatusStates {
  'admin',
  'user',
  'guest',
}

export enum Languages {
  'en',
  'ru',
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

export interface ProfileInfo {
  username: string | null
  name: string
  surname: string | null
  status: ProfileStatusStates
  token: string | null
}

export interface ProfileInterface extends ProfileInfo {
  language: Languages
  state: ProfileStates
  error: ValidationError[]
}

export interface BookInterface {
  authors: string[]
  title: string
}

export interface ErrorsInterface {
  state: ErrorsStates
  data: ServerError[]
}

export interface ExtendedBookInterface<K> extends BookInterface {
  authors: string[]
  id: K
  title: string
  description: string
  imageLinks: { small: string, normal: string }
  link: string
}

export type AllIDs = string;

export interface BooksInterface {
  state: BooksStates,
  data: { [K in AllIDs]: ExtendedBookInterface<K>},
  allIDs: AllIDs[],
  error: ValidationError[] | ServerError[],
}

export interface ValidationError {
  param: string
  msg: string
}

export type ServerError = {
  msg: string
  [id: string]: string
};
