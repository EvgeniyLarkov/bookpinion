/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ValidationError } from '../redux/ducks/types';

export function isArrayOf<T>(arr: unknown, condition: (item: unknown) => boolean): arr is T[] {
  return Array.isArray(arr) && arr.every(condition);
}

export function isArrayOfStrings(arr: unknown): arr is string[] {
  return isArrayOf<string>(arr, (item) => typeof item === 'string');
}

// eslint-disable-next-line import/prefer-default-export
export const normalizeValidationErrors = (errors: ValidationError[]) => errors.reduce(
  (acc: { [index: string]: string[] }, { msg, param }) => {
    if (acc[param] === undefined) {
      return { ...acc, [param]: [msg] };
    }
    return { ...acc, [param]: [...acc[param], msg] };
  },
  {},
);
