import { ButtonBase } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import InputBase from './InputBase';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export interface LoginFormInterface {
  handleSubmit?: () => void;
}

const LoginForm: React.FC<LoginFormInterface> = ({
  handleSubmit,
}: LoginFormInterface) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(ev.target.value);
  };

  const handlePasswordChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(ev.target.value);
  };

  return (
    <Wrapper>
      <InputBase value={username} placeholder={t('loginForm.usernamePh')} onChange={handleUsernameChange} />
      <InputBase value={password} placeholder={t('loginForm.passwordPh')} onChange={handlePasswordChange} />
      <ButtonBase onClick={handleSubmit}>Submit</ButtonBase>
    </Wrapper>
  );
};

export default LoginForm;
