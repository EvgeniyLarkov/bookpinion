import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import { AppDispatch } from '../redux/store';
import ButtonBase from '../atoms/ButtonBase';
import { loginByUsername, setErrors } from '../redux/ducks/profile';
import TextBase from '../atoms/TextBase';
import { openModal } from '../redux/ducks/modal';
import { ModalVariants, ProfileFields } from '../redux/ducks/types';
import validate from '../validations';
import FieldWithLabel from './FieldWithLabel';
import {
  getNormilizedProfileErrors,
  isProfileFetched,
  isProfileFetching,
  profileNameSelector,
} from '../utils/selectors';
import { SuccessAction } from '../atoms';

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 16px;
`;

const LoginForm: React.FC = () => {
  const { t } = useTranslation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch: AppDispatch = useDispatch();

  const name = useSelector(profileNameSelector);
  const isLogged = useSelector(isProfileFetched);
  const isFetching = useSelector(isProfileFetching);
  const normalizedErrors = useSelector(getNormilizedProfileErrors);

  const handleFieldChange = (setter: typeof setUsername) => (
    ev: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setter(ev.target.value);
  };

  const handleRegisterClick = () => {
    dispatch(openModal({ label: t('register'), variant: ModalVariants.registration }));
  };

  const handleSubmit = () => {
    const usernameErrors = validate(ProfileFields.username, username);
    const passwordErrors = validate(ProfileFields.password, password);

    const allErrors = [
      ...usernameErrors,
      ...passwordErrors,
    ];
    if (!isEmpty(allErrors)) {
      dispatch(setErrors(allErrors));
    } else {
      dispatch(loginByUsername({ username, password }));
    }
  };

  return (
    <Wrapper>
      {isLogged ? (
        <SuccessAction h="200px">
          {t('loginForm.loginSuccess', { name })}
        </SuccessAction>
      ) : (
        <>
          <FieldWithLabel
            placeholder={t('loginForm.usernamePh')}
            value={username}
            onChange={handleFieldChange(setUsername)}
            tooltipContent={normalizedErrors.username}
            isValid={isEmpty(normalizedErrors.username)}
            disabled={isFetching}
          />
          <FieldWithLabel
            placeholder={t('loginForm.passwordPh')}
            value={password}
            onChange={handleFieldChange(setPassword)}
            tooltipContent={normalizedErrors.password}
            isValid={isEmpty(normalizedErrors.password)}
            disabled={isFetching}
          />
          <ButtonBase onClick={handleSubmit}>
            <TextBase p="8px 0" fontWeight={400}>
              {t('loginForm.loginButton')}
            </TextBase>
          </ButtonBase>
          <ButtonBase onClick={handleRegisterClick}>
            <TextBase p="8px 0" fontWeight={400}>
              {t('register')}
            </TextBase>
          </ButtonBase>
        </>
      )}

    </Wrapper>
  );
};

export default LoginForm;
