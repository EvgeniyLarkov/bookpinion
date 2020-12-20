import styled from 'styled-components';
import Theme from '../styles/d';

interface InputProps {
  readonly m?: string;
  readonly p?: string | number;
  readonly fontSize?: string;
  readonly fontWeight?: number;
  readonly fontStyle?: 'normal' | 'italic' | 'oblique';
  readonly bgColor?: string;
  readonly borderColor?: string;
  readonly value?: string;
  readonly placeholder?: string;
  readonly onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readonly theme: Theme
}

const InputBase = styled.input.attrs((props: InputProps) => ({
  placeholder: props.placeholder || '',
  value: props.value || '',
  onChange: props.onChange,
}))<InputProps>`
    display: inline-block;
    font-family: Roboto, Arial, sans-serif;
    font-size: ${(props: InputProps) => props.fontSize || '18px'};
    font-style: ${(props: InputProps) => props.fontStyle || 'normal'};
    font-weight: ${(props: InputProps) => props.fontWeight || 300};
    line-height: 1.5;
    color: ${(props: InputProps) => props.theme.typography.main};
    padding: ${(props: InputProps) => props.p || '0 8px'};
    margin: ${(props: InputProps) => props.m || 0};
    background-color: ${(props) => (props.bgColor ? props.theme.palette[props.bgColor] : 'inherit')};
    border: none;
    border-bottom: 1px solid ${(props: InputProps) => props.borderColor || props.theme.typography.main};
`;

export default InputBase;
