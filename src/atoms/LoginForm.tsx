import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch } from '../redux/store';
import InputBase from './InputBase';
import ButtonBase from './ButtonBase';
import { loginByUsername } from '../redux/reducers/profile';
import TextBase from './TextBase';
import { openModal } from '../redux/reducers/modal';
import { ModalVariants } from '../redux/reducers/types';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    .loginform__actions {
      display: flex;
      margin-top: 16px;
      flex-direction: column;
    }
`;

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: AppDispatch = useDispatch();

  const handleUsernameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(ev.target.value);
  };

  const handlePasswordChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(ev.target.value);
  };

  const handleRegisterClick = () => {
    dispatch(openModal({ label: t('register'), variant: ModalVariants.registration }));
  };

  const handleSubmit = () => {
    dispatch(loginByUsername({ username, password }));
  };

  return (
    <Wrapper>
      <InputBase value={username} placeholder={t('loginForm.usernamePh')} onChange={handleUsernameChange} />
      <InputBase value={password} placeholder={t('loginForm.passwordPh')} onChange={handlePasswordChange} />
      <div className="loginform__actions">
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
      </div>
    </Wrapper>
  );
};

export default LoginForm;
