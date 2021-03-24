import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OptionsType } from '../../atoms/SelectExtended';
import { publishArticle, setArticleError } from '../../redux/ducks/articles';
import { ArticleFields } from '../../redux/ducks/types';
import { AppDispatch } from '../../redux/store';
import { getNormilizedArticleErrors, booksPreviewSelector } from '../../utils/selectors';
import InputBlockView from './components';
import useRating from './hooks/useRating';
import validate from '../../validations';

// eslint-disable-next-line import/prefer-default-export
export const InputBlock: React.FC = () => {
  const {
    rating, handleSetRating, maxRating, minRating, deltaRating,
  } = useRating();

  const dispatch: AppDispatch = useDispatch();

  const [article, setArticle] = useState('');
  const [bookId, setBookId] = useState('');
  const [previewData, setPreviewData] = useState<OptionsType[]>([{ label: '', title: 'pending', value: 'null' }]);

  const normalizedErrors = useSelector(getNormilizedArticleErrors);
  const preview = useSelector(booksPreviewSelector);

  const handleSetArticleText = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    setArticle(ev.target.value);
  };

  const handleSetBook = (id: string) => {
    setBookId(id);
  };

  useEffect(() => {
    const sortByAuthors = (preview === null)
      ? [{ value: '', title: 'No data' }]
      : preview.reduce<OptionsType[]>((acc, { id, title, authors }) => {
        const sorted = authors.map((author: string) => ({
          label: author,
          value: id,
          title,
        }));
        return [...acc, ...sorted];
      }, []);

    setPreviewData(sortByAuthors);
  }, [preview]);

  const handleSendArticle = () => {
    const articleTextErrors = validate(ArticleFields.article, article);
    const allErrors = [...articleTextErrors];
    if (!isEmpty(allErrors)) {
      dispatch(setArticleError(allErrors));
    } else {
      dispatch(publishArticle({ article, bookId, rating }));
    }
  };

  return (
    <InputBlockView
      article={article}
      handleSetArticleText={handleSetArticleText}
      handleSendArticle={handleSendArticle}
      handleSetBook={handleSetBook}
      normalizedErrors={normalizedErrors}
      rating={rating}
      maxRating={maxRating}
      minRating={minRating}
      handleSetRating={handleSetRating}
      deltaRating={deltaRating}
      previewData={previewData}
    />
  );
};
