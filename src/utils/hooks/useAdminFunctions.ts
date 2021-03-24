import { useDispatch, useSelector } from 'react-redux';
import { updateBookById } from '../../redux/ducks/books';
import { ExtendedBookInterface } from '../../redux/ducks/types';
import { AppDispatch } from '../../redux/store';
import { isUserAdmin } from '../selectors';

export type PartialBookInterface = Partial<ExtendedBookInterface<string>> & Pick<ExtendedBookInterface<string>, 'id'>;

export interface UseAdminFunctionsInterface {
  isAdmin: boolean;
  updateData: (data: PartialBookInterface) => void;
  removeData: (data: PartialBookInterface) => void;
}

const useAdminFunctions = (): UseAdminFunctionsInterface => {
  const dispatch: AppDispatch = useDispatch();
  const isAdmin = useSelector(isUserAdmin);

  const updateData = (data: PartialBookInterface) => {
    dispatch(updateBookById(data));
  };

  const removeData = (data: PartialBookInterface) => {
    // eslint-disable-next-line no-console
    console.log(data);
    // dispatch(updateBookById(data));
  };

  return { isAdmin, updateData, removeData };
};

export default useAdminFunctions;
