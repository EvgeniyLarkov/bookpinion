import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from './IconButton';

const Input = styled.input`
    width: 100%;
    font-family: Roboto, Arial, sans-serif;
    font-style: normal;
    font-weight: 300;
    line-height: 27px;
    font-size: 18px;
    margin: 0;
    color: ${(props) => props.theme.typography.main};
    border: none;
    background-color: inherit;
    overflow: hidden;
`;

const Wrapper = styled.div.attrs((props) => ({ ...props }))`
    display: flex;
    line-height: 27px;
    border-bottom: 1px solid ${(props) => props.theme.typography.main};
`;

const Search: React.FC<React.HTMLAttributes<HTMLDivElement>> = (attrs) => (
  <Wrapper {...attrs}>
    <IconButton><SearchIcon /></IconButton>
    <Input />
  </Wrapper>
);

export default Search;
