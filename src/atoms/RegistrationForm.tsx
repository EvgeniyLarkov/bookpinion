import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { LinearProgress } from '@material-ui/core';
import styled from 'styled-components';
import TextBase from './TextBase';
import ButtonBase from './ButtonBase';
import { AppDispatch } from '../redux/store';
import { registerUser, setErrors } from '../redux/reducers/profile';
import { RootState } from '../redux/reducers';
import { ProfileStates } from '../redux/reducers/types';
import validate from '../validations';
import C from '../validations/constants';
import FieldWithLabel from './FieldWithLabel';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 16px;
    row-gap: 32px;
`;

const isEmpty = (value: string[] | undefined) => value === undefined || value.length === 0;

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
    const usernameErrors = validate('username', username);
    const firstnameErrors = validate('firstname', firstname);
    const lastnameErrors = validate('lastname', lastname);
    const passwordErrors = validate('password', password);

    const allErrors = [...usernameErrors, ...firstnameErrors, ...lastnameErrors, ...passwordErrors];
    if (allErrors.length !== 0) {
      dispatch(setErrors(allErrors));
    } else {
      dispatch(registerUser({
        username, name: firstname, surname: lastname, password,
      }));
    }
  };
  console.log(normalizedErrors);
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
      />
      <FieldWithLabel
        label={t('registrationForm.passwordRepeat')}
        placeholder={t('registrationForm.passwordPh')}
        value={passwordRepeat}
        onChange={handleFieldChange(setPasswordRepeat)}
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
