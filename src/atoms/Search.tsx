import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from './IconButton';

const Input = styled.input`
    font-family: Roboto, Arial, sans-serif;
    font-style: normal;
    font-weight: 300;
    line-height: 27px;
    font-size: 18px;
    margin: 0;
    color: ${(props) => props.theme.typography.main};
    width: 150px;
    border: none;
    background-color: inherit;
`;

const Wrapper = styled.div`
    display: block;
    line-height: 27px;
    border-bottom: 1px solid ${(props) => props.theme.typography.main};
`;

const StyledSearchIcon = styled(SearchIcon)`
    vertical-align: middle;
`;

const Search: React.FC = () => (
  <Wrapper>
    <IconButton><StyledSearchIcon /></IconButton>
    <Input />
  </Wrapper>
);

export default Search;
