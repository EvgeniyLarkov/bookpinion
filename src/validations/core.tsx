import i18n from 'i18next';
import validator from 'validator';

export interface ValidatorPipelineInterface {
  field: string
  data: string
  errors: string[]
}

export const defaultValidations = (
  input: ValidatorPipelineInterface,
): ValidatorPipelineInterface => {
  const { data, errors, field } = input;
  let defaultErrors: string[] = [];

  if (validator.isEmpty(data)) {
    defaultErrors = [...errors, i18n.t('validationErrors.isEmpty', { field })];
  }
  if (!validator.isAlphanumeric(data)) {
    defaultErrors = [...errors, i18n.t('validationErrors.isAlphanumeric', { field })];
  }

  return { data, errors: [...errors, ...defaultErrors], field };
};

export const lengthValidation = (options: { min: number, max: number }) => (
  input: ValidatorPipelineInterface,
): ValidatorPipelineInterface => {
  const { min, max } = options;
  const { data, errors, field } = input;
  let defaultErrors: string[] = [];

  if (!validator.isLength(data, { min, max })) {
    defaultErrors = [...errors, i18n.t('validationErrors.isLength', { field, min, max })];
  }

  return { data, errors: [...errors, ...defaultErrors], field };
};

export const compareValidation = (options?: { data: string, field: string }) => (
  input: ValidatorPipelineInterface,
): ValidatorPipelineInterface => {
  const { data, errors, field } = input;

  if (options === undefined) {
    return { data, errors: [...errors, 'Provide data to compare'], field };
  }

  const { data: data2, field: field2 } = options;

  let defaultErrors: string[] = [];

  if (!validator.matches(data, data2)) {
    defaultErrors = [...errors, i18n.t('validationErrors.notMatch', { field1: field, field2 })];
  }

  return { data, errors: [...errors, ...defaultErrors], field };
};
