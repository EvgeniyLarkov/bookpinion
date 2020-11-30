import styled from 'styled-components';

const TextBase = styled.p`
    font-family: Roboto, Arial, sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    color: ${(props) => props.theme.typography.main};
    background: ${(props) => props.theme.palette.main};
    resize: none;
    border: none;
`;

export default TextBase;
