import React, { useState } from 'react';
import styled from 'styled-components';
import TextBase from '../atoms/TextBase';
import Tooltip from './Tooltip';
import InputBase from '../atoms/InputBase';
import mainTheme from '../styles/theme';

export interface FieldWithLabelProps {
  label?: string
  placeholder: string
  value: string,
  tooltipContent?: string[] | string,
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
  isValid?: boolean
}

const StyledField = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
`;

const FieldWithLabel: React.FC<FieldWithLabelProps> = ({
  label, placeholder, value, onChange: handler, tooltipContent, isValid = true,
}: FieldWithLabelProps) => {
  const [visible, setVisible] = useState(false);

  const handleMouseOver = () => {
    if (tooltipContent !== undefined) {
      setVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (tooltipContent !== undefined) {
      setVisible(false);
    }
  };

  return (
    <StyledField>
      { label && <TextBase>{label}</TextBase> }
      <InputBase
        value={value}
        onChange={handler}
        placeholder={placeholder}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        borderColor={isValid ? undefined : mainTheme.palette.negative}
      />
      {tooltipContent && <Tooltip visible={visible}>{tooltipContent}</Tooltip>}
    </StyledField>
  );
};

export default FieldWithLabel;
