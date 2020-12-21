import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { LinearProgress } from '@material-ui/core';
import styled from 'styled-components';
import TextBase from '../atoms/TextBase';
import ButtonBase from '../atoms/ButtonBase';
import { AppDispatch } from '../redux/store';
import { registerUser, setErrors } from '../redux/ducks/profile';
import { RootState } from '../redux/ducks';
import { ProfileFields, ProfileStates } from '../redux/ducks/types';
import validate from '../validations';
import C from '../validations/constants';
import FieldWithLabel from './FieldWithLabel';

// TO-DO
// 1. Добавить селектор для нормализованных ошибок

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 16px;
    row-gap: 32px;
`;

const isEmpty = (value: undefined | unknown[]) => value === undefined || value.length === 0;

const RegistrationForm: React.FC = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();

  const { state, error } = useSelector(({ profile }: RootState) => profile);

  const normalizedErrors = error.reduce((acc: { [index: string]: string[] }, { msg, param }) => {
    if (acc[param] === undefined) {
      return { ...acc, [param]: [msg] };
    }
    return { ...acc, [param]: [...acc[param], msg] };
  },
  {});

  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const handleFieldChange = (setter: typeof setUsername) => (
    ev: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setter(ev.target.value);
  };

  const handleRegistrationConfirm = () => {
    const usernameErrors = validate(ProfileFields.username, username);
    const firstnameErrors = validate(ProfileFields.firstname, firstname);
    const lastnameErrors = validate(ProfileFields.lastname, lastname);
    const passwordErrors = validate(ProfileFields.password, password);
    const passwordRepeatErrors = validate('passwordRepeat', passwordRepeat, { data: password, field: ProfileFields.password });

    const allErrors = [
      ...usernameErrors,
      ...firstnameErrors,
      ...lastnameErrors,
      ...passwordErrors,
      ...passwordRepeatErrors,
    ];
    if (!isEmpty(allErrors)) {
      dispatch(setErrors(allErrors));
    } else {
      dispatch(registerUser({
        username, name: firstname, surname: lastname, password,
      }));
    }
  };

  return (
    <Wrapper>
      {state === ProfileStates.pending && <LinearProgress /> }
      <FieldWithLabel
        label={t('registrationForm.firstname')}
        placeholder={t('registrationForm.firstnamePh')}
        value={firstname}
        onChange={handleFieldChange(setFirstname)}
        tooltipContent={normalizedErrors.firstname}
        isValid={isEmpty(normalizedErrors.firstname)}
      />
      <FieldWithLabel
        label={t('registrationForm.lastname')}
        placeholder={t('registrationForm.lastnamePh')}
        value={lastname}
        onChange={handleFieldChange(setLastname)}
        tooltipContent={normalizedErrors.lastname}
        isValid={isEmpty(normalizedErrors.lastname)}
      />
      <FieldWithLabel
        label={t('registrationForm.username')}
        placeholder={t('registrationForm.usernamePh')}
        value={username}
        onChange={handleFieldChange(setUsername)}
        tooltipContent={normalizedErrors.username}
        isValid={isEmpty(normalizedErrors.username)}
      />
      <TextBase fontSize="16px">
        {t('registrationForm.usernameTip', { min: C.MIN_USERNAME_CHARS, max: C.MAX_USERNAME_CHARS })}
      </TextBase>
      <FieldWithLabel
        label={t('registrationForm.password')}
        placeholder={t('registrationForm.passwordPh')}
        value={password}
        onChange={handleFieldChange(setPassword)}
        tooltipContent={normalizedErrors.password}
        isValid={isEmpty(normalizedErrors.password)}
      />
      <FieldWithLabel
        label={t('registrationForm.passwordRepeat')}
        placeholder={t('registrationForm.passwordPh')}
        value={passwordRepeat}
        onChange={handleFieldChange(setPasswordRepeat)}
        tooltipContent={normalizedErrors.passwordRepeat}
        isValid={isEmpty(normalizedErrors.passwordRepeat)}
      />
      <ButtonBase onClick={handleRegistrationConfirm}>
        <TextBase p="8px 0" fontWeight={400}>
          {t('register')}
        </TextBase>
      </ButtonBase>
    </Wrapper>
  );
};

export default RegistrationForm;
