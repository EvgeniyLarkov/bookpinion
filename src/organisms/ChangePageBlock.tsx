import React, { useState } from 'react';
import styled from 'styled-components';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import InputBase from '../atoms/InputBase';
import IconButton from '../atoms/IconButton';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 36px;
`;

const PageInput = styled(InputBase)`
    width: 18px;
    margin: 0 12px;
    padding: 0 2vh;
    background-color: ${(props) => props.theme.palette.mainDark};
`;

interface ChangePageBlockInterface {
  readonly pageNumber: number
  readonly setPageNumber: (arg: number) => void
  readonly setNextPage: () => void
  readonly setPreviousPage: () => void
  readonly setLastPage: () => void
  readonly setFirstPage: () => void
}

const ChangePageBlock: React.FC<ChangePageBlockInterface> = (
  {
    pageNumber,
    setPageNumber,
    setNextPage,
    setPreviousPage,
    setLastPage,
    setFirstPage,
  }: ChangePageBlockInterface,
) => {
  const [value, setValue] = useState(`${pageNumber}`);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof +event.target.value === 'number') {
      setValue(event.target.value);
    }
  };

  const handleSubmit = () => {
    setPageNumber(+value);
  };

  return (
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
};

export default ChangePageBlock;
