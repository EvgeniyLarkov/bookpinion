import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import TextBase from '../atoms/TextBase';
import ButtonBase from '../atoms/ButtonBase';
import { AppDispatch } from '../redux/store';
import { registerUser, setErrors } from '../redux/ducks/profile';
import { ProfileFields } from '../redux/ducks/types';
import validate from '../validations';
import C from '../validations/constants';
import FieldWithLabel from './FieldWithLabel';
import {
  getNormilizedProfileErrors,
  isProfileFetched,
  isProfileFetching,
  profileNameSelector,
} from '../utils/selectors';
import { SuccessAction } from '../atoms';

// TO-DO
// 1. Добавить селектор для нормализованных ошибок
// 2. При закрытии окна/изменении поля стереть все ошибки

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media screen and (min-width: 60em) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 16px;
    row-gap: 32px;
  }
`;

const RegistrationForm: React.FC = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();

  const name = useSelector(profileNameSelector);
  const isLogged = useSelector(isProfileFetched);
  const isFetching = useSelector(isProfileFetching);
  const normalizedErrors = useSelector(getNormilizedProfileErrors);

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
    <>
      {isLogged ? (
        <SuccessAction h="200px">
          {t('registrationForm.registrationSuccess', { name })}
        </SuccessAction>
      ) : (
        <Wrapper>
          <FieldWithLabel
            label={t('registrationForm.firstname')}
            placeholder={t('registrationForm.firstnamePh')}
            value={firstname}
            onChange={handleFieldChange(setFirstname)}
            tooltipContent={normalizedErrors.firstname}
            isValid={isEmpty(normalizedErrors.firstname)}
            disabled={isFetching}
          />
          <FieldWithLabel
            label={t('registrationForm.lastname')}
            placeholder={t('registrationForm.lastnamePh')}
            value={lastname}
            onChange={handleFieldChange(setLastname)}
            tooltipContent={normalizedErrors.lastname}
            isValid={isEmpty(normalizedErrors.lastname)}
            disabled={isFetching}
          />
          <FieldWithLabel
            label={t('registrationForm.username')}
            placeholder={t('registrationForm.usernamePh')}
            value={username}
            onChange={handleFieldChange(setUsername)}
            tooltipContent={normalizedErrors.username}
            isValid={isEmpty(normalizedErrors.username)}
            disabled={isFetching}
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
            disabled={isFetching}
          />
          <FieldWithLabel
            label={t('registrationForm.passwordRepeat')}
            placeholder={t('registrationForm.passwordPh')}
            value={passwordRepeat}
            onChange={handleFieldChange(setPasswordRepeat)}
            tooltipContent={normalizedErrors.passwordRepeat}
            isValid={isEmpty(normalizedErrors.passwordRepeat)}
            disabled={isFetching}
          />
          <ButtonBase onClick={handleRegistrationConfirm}>
            <TextBase p="8px 0" fontWeight={400}>
              {t('register')}
            </TextBase>
          </ButtonBase>
        </Wrapper>
      )}
    </>
  );
};

export default RegistrationForm;
