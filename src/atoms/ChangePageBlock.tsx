import React from 'react';
import styled from 'styled-components';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import InputBase from './InputBase';
import IconButton from './IconButton';

const Container = styled.div`
    display: flex;
    justify-content: center;
`;

const PageInput = styled(InputBase)`
    width: 20px;
    margin: 0 12px;
    padding: 0 2vh;
    background-color: ${(props) => props.theme.palette.mainDark};
`;

const ChangePageBlock: React.FC = () => (
  <Container>
    <IconButton><NavigateBeforeIcon /></IconButton>
    <IconButton><FirstPageIcon /></IconButton>
    <PageInput />
    <IconButton><LastPageIcon /></IconButton>
    <IconButton><NavigateNextIcon /></IconButton>
  </Container>
);

export default ChangePageBlock;
