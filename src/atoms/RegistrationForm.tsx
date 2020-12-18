import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import InputBase from './InputBase';
import TextBase from './TextBase';

const Wrapper = styled.div`
    display: grid;

`;

const StyledField = styled.div`
    margin: 16px;
    display: flex;
    flex-direction: column;
`;

export interface FieldWithLabelProps {
  label: string
  placeholder: string
  value: string
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
}

const FieldWithLabel: React.FC<FieldWithLabelProps> = ({
  label, placeholder, value, onChange: handler,
}: FieldWithLabelProps) => (
  <StyledField>
    <TextBase>
      {label}
    </TextBase>
    <InputBase value={value} onChange={handler} placeholder={placeholder} />
  </StyledField>
);

const RegistrationForm: React.FC = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const dispatch: AppDispatch = useDispatch();

  const handleUsernameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(ev.target.value);
  };

  return (
    <Wrapper>
      <FieldWithLabel
        label={t('registrationForm.username')}
        placeholder={t('registrationForm.usernamePh')}
        value={username}
        onChange={handleUsernameChange}
      />
    </Wrapper>
  );
};

export default RegistrationForm;
