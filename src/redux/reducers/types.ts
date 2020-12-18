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

export interface ProfileInfo {
  username: string | null
  name: string
  surname: string | null
  status: ProfileStatusStates
}

export interface ProfileInterface extends ProfileInfo {
  language: Languages
  state: ProfileStates
  token: string | null
  error: string[]
}

export interface LoginData {
  username: string
  password: string
}
