import React from 'react';
import styled from 'styled-components';
import { ButtonBase as MaterialButton } from '@material-ui/core';

export interface ButtonProps {
  children: React.ReactChildren | React.ReactChild;
  borderRadius?: number;
  onClick?: () => void;
}

const StyledButton = styled(MaterialButton)<ButtonProps>`
      && {
          display: 'inline-block';
          border-radius: ${(props) => `${props.borderRadius || 8}px`};
          background-color: ${(props) => props.theme.palette.main};
          &:hover {
              background-color: ${(props) => props.theme.palette.mainDark};
              transition: all 0.3s cubic-bezier(.25,.8,.25,1);
          }
      }
  `;

const ButtonBase:React.FC<ButtonProps> = ({
  children, borderRadius, onClick,
}: ButtonProps) => (
  <StyledButton borderRadius={borderRadius} onClick={onClick}>
    {children}
  </StyledButton>
);

export default ButtonBase;
