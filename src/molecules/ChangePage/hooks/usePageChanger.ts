import React, { useEffect, useState } from 'react';
import { ChangePageInterface } from '../components/ChangePageBlock';

export interface ChangePageProps {
  readonly pageNumber: number,
  readonly maxPage: number,
  readonly setPage: (arg: number) => void
}

const usePageChangner = (
  pageNumber: number,
  maxPage: number,
  setPage: (arg: number) => void,
): ChangePageInterface => {
  const [value, setValue] = useState(`${pageNumber}`);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof +event.target.value === 'number') {
      setValue(event.target.value);
    }
  };

  useEffect(() => {
    setValue(`${pageNumber}`);
  }, [pageNumber]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setPage(+value);
  };

  const setNextPage = () => {
    if (pageNumber >= maxPage) setPage(pageNumber);
    else setPage(pageNumber + 1);
  };
  const setPreviousPage = () => {
    if (pageNumber > 1) setPage(pageNumber - 1);
    else setPage(pageNumber);
  };
  const setFirstPage = () => { setPage(1); };
  const setLastPage = () => { setPage(maxPage); };

  return {
    value,
    handleValueChange,
    handleSubmit,
    setNextPage,
    setPreviousPage,
    setFirstPage,
    setLastPage,
  };
};

export default usePageChangner;
