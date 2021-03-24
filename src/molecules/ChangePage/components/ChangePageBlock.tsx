import React from 'react';
import styled from 'styled-components';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import { IconButton, InputBase } from '../../../atoms';

export interface ChangePageInterface {
  readonly value: string,
  readonly setFirstPage: () => void,
  readonly setPreviousPage: () => void,
  readonly setNextPage: () => void,
  readonly setLastPage: () => void,
  readonly handleValueChange: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  readonly handleSubmit: (ev: React.FormEvent) => void,
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 36px;
`;

const PageInput = styled(InputBase)`
    width: 32px;
    text-align: center;
    background-color: ${(props) => props.theme.palette.mainDark};
`;

const ChangePageBlock: React.FC<ChangePageInterface> = (
  {
    value,
    setFirstPage,
    setPreviousPage,
    setNextPage,
    setLastPage,
    handleValueChange,
    handleSubmit,
  }: ChangePageInterface,
) => (
  <Container>
    <IconButton onClick={setFirstPage}><FirstPageIcon /></IconButton>
    <IconButton onClick={setPreviousPage}><NavigateBeforeIcon /></IconButton>
    <form onSubmit={handleSubmit}>
      <PageInput value={value} onChange={handleValueChange} />
    </form>
    <IconButton onClick={setNextPage}><NavigateNextIcon /></IconButton>
    <IconButton onClick={setLastPage}><LastPageIcon /></IconButton>
  </Container>
);

export default ChangePageBlock;
