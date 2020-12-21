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

export interface ValidationError {
  param: string,
  msg: string
}
