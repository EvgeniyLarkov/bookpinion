import styled from 'styled-components';

interface TextProps {
  readonly m?: string;
  readonly p?: string | number;
  readonly fontSize?: string;
  readonly fontWeight?: number;
  readonly fontStyle?: 'normal' | 'italic' | 'oblique';
  readonly color?: string;
}

const TextBase = styled.p<TextProps>`
    display: inline-block;
    font-family: Roboto, Arial, sans-serif;
    font-size: ${(props) => props.fontSize || '18px'};
    font-style: ${(props) => props.fontStyle || 'normal'};
    font-weight: ${(props) => props.fontWeight || 300};
    color: ${(props) => props.color || props.theme.typography.main};
    background: inherit;
    padding: ${(props) => props.p || 0};
    margin: ${(props) => props.m || 0};
`;

export default TextBase;
