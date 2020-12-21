import { ValidationError } from '../redux/ducks/types';

export interface ServerSuccessResponse<T> {
  status: string
  message: T
  token?: string
}

export interface ServerErrorResponse {
  status: string
  message?: string
  errors: ValidationError[]
}

export interface BaseUserInfo {
  username: string
  password: string
}

export interface ExtendedUserInfo extends BaseUserInfo {
  name: string
  surname: string
}
