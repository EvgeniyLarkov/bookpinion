import styled from 'styled-components';

const Title = styled.h2`
    font-family: Roboto, Arial, sans-serif;
    font-weight: 400;
    font-size: 36px;
    line-height: 48px;
    color: ${(props) => props.theme.typography.main};
    padding: 12px 0;
    margin: 0;
`;

export default Title;
