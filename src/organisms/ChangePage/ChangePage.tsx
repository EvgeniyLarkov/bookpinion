/* eslint-disable import/prefer-default-export */
import React from 'react';
import ChangePageBlock from './components/ChangePageBlock';
import usePageChangner, { ChangePageProps } from './hooks/usePageChanger';

export const ChangePage: React.FC<ChangePageProps> = (props: ChangePageProps) => {
  const {
    pageNumber,
    maxPage,
    setPage,
  } = props;
  const hooks = usePageChangner(pageNumber, maxPage, setPage);

  return <ChangePageBlock {...hooks} />;
};
