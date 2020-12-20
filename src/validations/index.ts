import { pipe } from 'fp-ts/function';
import { ValidationError } from '../redux/reducers/types';
import C from './constants';
import { compareValidation, defaultValidations, lengthValidation } from './core';

// TO-DO:
// 1. Переделать на класс
// 2. Добавить поддержку массовой проверки

export default (
  field: string,
  value: string,
  options?: { data: string, field: string },
): ValidationError[] => {
  const preset = { data: value, field, errors: [] };
  switch (field) {
    case 'username':
      return pipe(
        preset,
        defaultValidations,
        lengthValidation({ min: C.MIN_USERNAME_CHARS, max: C.MAX_USERNAME_CHARS }),
      ).errors.map((errors) => ({ param: field, msg: errors }));
    case 'firstname':
      return pipe(
        preset,
        defaultValidations,
        lengthValidation({ min: C.MIN_NAME_CHARS, max: C.MAX_NAME_CHARS }),
      ).errors.map((errors) => ({ param: field, msg: errors }));
    case 'lastname':
      return pipe(
        preset,
        defaultValidations,
        lengthValidation({ min: C.MIN_SURNAME_CHARS, max: C.MAX_SURNAME_CHARS }),
      ).errors.map((errors) => ({ param: field, msg: errors }));
    case 'password':
      return pipe(
        preset,
        defaultValidations,
        lengthValidation({ min: C.MIN_PASSWORD_CHARS, max: C.MAX_PASSWORD_CHARS }),
        compareValidation(options),
      ).errors.map((errors) => ({ param: field, msg: errors }));
    default:
      return [];
  }
};
