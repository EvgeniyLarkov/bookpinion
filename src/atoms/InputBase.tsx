import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
    font-family: Roboto, Arial, sans-serif;
    font-style: normal;
    font-weight: 300;
    line-height: 27px;
    font-size: 18px;
    margin: 0;
    color: ${(props) => props.theme.typography.main};
    border: none;
    background-color: inherit;
`;
const InputBase: React.FC = () => <Input />;

export default InputBase;
