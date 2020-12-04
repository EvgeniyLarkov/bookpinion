import styled from 'styled-components';
import TextBase from './TextBase';

const Title = styled(TextBase)`
    font-size: ${(props) => props.fontSize || '36px'};
    font-style: ${(props) => props.fontStyle || 'normal'};
    font-weight: ${(props) => props.fontWeight || 400};
    color: ${(props) => props.theme.typography.main};
    padding: ${(props) => props.p || 0};
    margin: ${(props) => props.m || 0};
    line-height: 1.5;
    padding: ${(props) => props.p || '12px 0'};
    margin: ${(props) => props.m || 0};
`;

export default Title;
