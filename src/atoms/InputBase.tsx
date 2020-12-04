import styled from 'styled-components';

interface InputProps {
  readonly m?: string;
  readonly p?: string | number;
  readonly fontSize?: string;
  readonly fontWeight?: number;
  readonly fontStyle?: 'normal' | 'italic' | 'oblique';
  readonly bgColor?: string;
}

const InputBase = styled.input<InputProps>`
    display: inline-block;
    font-family: Roboto, Arial, sans-serif;
    font-size: ${(props) => props.fontSize || '18px'};
    font-style: ${(props) => props.fontStyle || 'normal'};
    font-weight: ${(props) => props.fontWeight || 300};
    line-height: 1.5;
    color: ${(props) => props.theme.typography.main};
    padding: ${(props) => props.p || '0 8px'};
    margin: ${(props) => props.m || 0};
    background-color: ${(props) => (props.bgColor ? props.theme.palette[props.bgColor] : 'inherit')};
    border: none;
`;

export default InputBase;
