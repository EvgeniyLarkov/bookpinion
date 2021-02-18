import styled from 'styled-components';

const TextAreaBase = styled.textarea.attrs((props) => ({
  rows: props.rows || 3,
  cols: props.cols || 40,
  autoComplete: props.autoComplete,
}))`
    width: 100%;
    box-sizing: border-box;
    font-family: Roboto, Arial, sans-serif;
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    padding: 8px 4px;
    color: ${(props) => props.theme.typography.main};
    background: ${(props) => props.theme.palette.main};
    resize: none;
    border: none;
`;

export default TextAreaBase;
