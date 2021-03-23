/* eslint-disable import/prefer-default-export */
import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/ducks/modal';
import { ExtendedBookInterface, ModalVariants } from '../../redux/ducks/types';
import { AppDispatch } from '../../redux/store';
import BookPictureBlock from './components';
import useAdminFunctions from './hooks/useAdminFunctions';

export interface BookPictureExtendedInterface extends React.HTMLAttributes<HTMLDivElement> {
  book: ExtendedBookInterface<string>
}

export const BookPictureExtended: React.FC<BookPictureExtendedInterface> = (
  { book, ...rest }: BookPictureExtendedInterface,
) => {
  const dispatch: AppDispatch = useDispatch();
  const { isAdmin } = useAdminFunctions();

  const handleOpenUpdateModal = (): void => {
    dispatch(openModal({ variant: ModalVariants.updateBookData, data: { id: book.id }, label: 'Update book info' }));
  };

  const handleRemove = (): void => {
    const alert = window.alert('Are you sure to delete this book from collection?');
    console.log(alert);
  };

  return (
    <BookPictureBlock
      book={book}
      isAdmin={isAdmin}
      handleUpdateData={handleOpenUpdateModal}
      handleRemoveData={handleRemove}
      {...rest}
    />
  );
};
