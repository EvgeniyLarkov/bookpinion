import React from 'react';
import styled from 'styled-components';
import { ButtonBase } from '@material-ui/core';
import TextBase from './TextBase';

const Label = styled(TextBase)`
    font-size: 16px;
    font-weight: 400;
    margin: 6px 12px;
    background-color: inherit;
`;

const Button = styled(ButtonBase)`
    && {
        margin-left: 12px;
        display: inline-block;
        background-color: ${(props) => props.theme.palette.main};
        border-radius: 16px;
        box-shadow: ${(props) => props.theme.shadow.light};
        &:hover {
            background-color: ${(props) => props.theme.palette.mainDark};
            transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        }
    }
`;

export interface ChipProps {
  children: string;
}

// eslint-disable-next-line max-len
const Chip: React.FC<ChipProps> = ({ children }: ChipProps) => <Button><Label>{children}</Label></Button>;

export default Chip;
