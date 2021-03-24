import { useState } from 'react';
import C from '../../../validations/constants';

export interface UseRatingInterface {
  rating: number;
  maxRating: number;
  minRating: number;
  deltaRating: number;
  handleSetRating: (value: number) => () => void;
}

const useRating = (initRating = 0.5): UseRatingInterface => {
  const maxRating = C.MAX_BOOK_RATING;
  const minRating = C.MIN_BOOK_RATING;
  const deltaRating = (maxRating - minRating);

  // eslint-disable-next-line no-nested-ternary
  const initState = initRating >= 1
    ? maxRating : initRating <= 0
      ? minRating : deltaRating * initRating;

  const [rating, setRating] = useState(initState);

  const handleSetRating = (value: number) => () => {
    setRating(value);
  };

  return {
    rating, handleSetRating, maxRating, minRating, deltaRating,
  };
};

export default useRating;
