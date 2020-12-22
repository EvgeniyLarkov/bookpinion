import { ValidationError } from '../redux/ducks/types';

// TO-DO
// 1. Переделать на функцию с дженериками
// 2. param в ValidationError должен иметь значения существующих полей(не просто строка)

// eslint-disable-next-line import/prefer-default-export
export const normalizeErrors = (error: ValidationError[]): {[x:string]: string[]} => error.reduce((
  acc: { [index: string]: string[] },
  { msg, param },
) => {
  if (acc[param] === undefined) {
    return { ...acc, [param]: [msg] };
  }
  return { ...acc, [param]: [...acc[param], msg] };
},
{});

/*
export function normalizeErrors(
  error: { param: ProfileFields, msg: string }[],
): {[index in Partial<ProfileFields>]: string[]} {
  return error.reduce((
    acc: { [index in Partial<ProfileFields>]: string[] },
    { msg, param },
  ) => {
    if (acc[param] === undefined) {
      return { ...acc, [param]: [msg] };
    }
    return { ...acc, [param]: [...acc[param], msg] };
  },
  {});
}
*/
