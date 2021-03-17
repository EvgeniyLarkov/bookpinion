import styled from 'styled-components';

interface InputProps extends React.InputHTMLAttributes<unknown> {
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
}

const InputBase = styled.input.attrs((props: InputProps) => ({
  type: 'text',
  placeholder: props.placeholder || '',
  value: props.value || '',
  onChange: props.onChange,
}))<InputProps>`
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
    border-bottom: 1px solid ${(props) => props.borderColor || props.theme.typography.main};
`;

export default InputBase;
