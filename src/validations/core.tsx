import i18n from 'i18next';
import validator from 'validator';

export interface ValidatorPipelineInterface {
  field: string
  data: string
  errors: string[]
}

// TO-DO
// 1. i18n убрать из ядра
// 2. Добавить опциональный аргумент к lenghtValidation

export const defaultValidations = (
  input: ValidatorPipelineInterface,
): ValidatorPipelineInterface => {
  const { data, errors, field } = input;
  let defaultErrors: string[] = [...errors];

  if (validator.isEmpty(data)) {
    defaultErrors = [...defaultErrors, i18n.t('validationErrors.isEmpty', { field })];
  }
  if (!validator.matches(data, '^[a-zA-Z0-9-_. ]+$')) {
    defaultErrors = [...defaultErrors, i18n.t('validationErrors.isAlphanumeric', { field })];
  }
  return { data, errors: defaultErrors, field };
};

export const lengthValidation = (options: { min: number, max: number }) => (
  input: ValidatorPipelineInterface,
): ValidatorPipelineInterface => {
  const { min, max } = options;
  const { data, errors, field } = input;
  let defaultErrors: string[] = [...errors];
  if (!validator.isLength(data, { min, max })) {
    defaultErrors = [...defaultErrors, i18n.t('validationErrors.isLength', { field, min, max })];
  }

  return { data, errors: [...defaultErrors], field };
};

export const compareValidation = (options?: { data: string, field: string }) => (
  input: ValidatorPipelineInterface,
): ValidatorPipelineInterface => {
  const { data, errors, field } = input;

  if (options === undefined) {
    return { data, errors: [...errors, 'Provide data to compare'], field };
  }

  const { data: data2, field: field2 } = options;

  let defaultErrors: string[] = [...errors];

  if (!validator.matches(data, data2)) {
    defaultErrors = [...defaultErrors, i18n.t('validationErrors.notMatch', { field1: field, field2 })];
  }

  return { data, errors: [...defaultErrors], field };
};
