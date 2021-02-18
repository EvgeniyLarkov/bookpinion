import React from 'react';
import styled from 'styled-components';
import { ButtonBase } from '@material-ui/core';

export interface IconButtonProps {
  children: React.ReactChildren | React.ReactChild;
  fontSize?: number;
  color?: string;
  m?: string;
  p?: string;
  onClick?: () => void;
}

const StyledButton = styled(ButtonBase)<IconButtonProps>`
    && {
        display: inline-block;
        margin: ${(props) => props.m || 0};
        padding: ${(props) => props.p || 0};
        border-radius: ${(props) => `${props.fontSize || 30}px`};
        line-height: 0.5;
        svg {
            font-size:  ${(props) => `${props.fontSize || 30}px`};
            color: ${(props) => props.color || props.theme.palette.secondary};
            padding: ${(props) => (props.fontSize ? `${props.fontSize / 4}px` : '8px')};
        }
        &:hover {
            background-color: ${(props) => props.theme.palette.mainDark};
            transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        }
    }
`;

const IconButton:React.FC<IconButtonProps & React.HTMLAttributes<HTMLButtonElement>> = ({
  children, fontSize, color, onClick, m, p, ...attrs
}: IconButtonProps) => (
  <StyledButton {...attrs} fontSize={fontSize} color={color} onClick={onClick} m={m} p={p}>
    {children}
  </StyledButton>
);

export default IconButton;
