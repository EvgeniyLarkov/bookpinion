export interface ServerSuccessResponse<T> {
  status: string
  message: T
  token?: string
}

export interface ServerErrorResponse {
  status: string
  message?: string
  errors: string[]
}

export interface BaseUserInfo {
  username: string
  password: string
}
