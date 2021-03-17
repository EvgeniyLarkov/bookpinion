import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import SendIcon from '@material-ui/icons/Send';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import {
  IconButton, Option, SelectBase, SelectExtended, TextAreaBase, TextBase, TitleBase,
} from '../atoms';
import { OptionsType } from '../atoms/SelectExtended';
import validate from '../validations';
import { ArticleFields } from '../redux/ducks/types';
import { AppDispatch } from '../redux/store';
import { publishArticle, setArticleError } from '../redux/ducks/articles';
import { Tooltip } from '../organisms';
import { RootState } from '../redux/ducks';
import C from '../validations/constants';
import { getNormilizedArticleErrors } from '../utils/selectors';

const Outer = styled.div`
    display: inline-block;
    position: relative;
    margin-top: 32px;
    padding: 12px 12px 12px 0;
    background-color: ${(props) => props.theme.palette.secondary};
    box-shadow: ${(props) => props.theme.shadow.standart};

    @media screen and (min-width: 60em) {
      margin-top: 64px;
      left: -32px;
    }

    @media screen and (min-width: 75em) {
      left: -64px;
    }

    @media screen and (min-width: 100em) {
      left: -128px;
    }
`;

const Inner = styled.div`
    padding-left: 12px;

    @media screen and (min-width: 60em) {
      padding-left: 32px;
    }

    @media screen and (min-width: 75em) {
      padding-left: 64px;
    }

    @media screen and (min-width: 100em) {
      padding-left: 128px;
    }
`;

const Title = styled(TitleBase)`
    color: ${(props) => props.theme.palette.main};
    padding: 0;
`;

const Description = styled(TextBase)`
    color: ${(props) => props.theme.palette.main};
    font-weight: 400;
    padding-bottom: 12px;
`;

const Wrapper = styled.div`
    display: inline-flex;
    position: relative;
    align-items: center;
    background-color: ${(props) => props.theme.palette.main};
    height: 100%;
    margin-bottom: 16px;

    .container {
      position: relative;
    }
`;

const PostitveIcon = styled(InsertEmoticonIcon)`&& { font-size: 50px }`;
const NeutralIcon = styled(SentimentSatisfiedIcon)`&& { font-size: 50px }`;
const NegativeIcon = styled(SentimentVeryDissatisfiedIcon)`&& { font-size: 50px }`;

const InputBlock: React.FC = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();

  const [article, setArticle] = useState('');
  const [rating, setRating] = useState(C.MAX_BOOK_RATING / 2);
  const [bookId, setBookId] = useState('');
  const [previewData, setPreviewData] = useState<OptionsType[]>([{ label: '', title: 'pending', value: 'null' }]);

  const { booksPreview: preview } = useSelector(({ meta }: RootState) => meta);

  const normalizedErrors = useSelector(getNormilizedArticleErrors);

  const handleSetArticleText = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    setArticle(ev.target.value);
  };

  const handleSetRating = (value: number) => () => {
    setRating(value);
  };
  console.log(bookId);
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
    <Outer>
      <Inner>
        <Title>{t('inputBlock.title')}</Title>
        <div>
          <Description>{t('inputBlock.description')}</Description>
          <SelectExtended
            options={previewData}
            placeholder={t('inputBlock.bookAdvice')}
            handler={handleSetBook}
            withAutocomplete
          />
        </div>
        <Wrapper>
          <TextAreaBase
            onChange={handleSetArticleText}
            value={article}
          />
          <div className="container">
            <SelectBase title={(
              <IconButton fontSize={50}>
                {(rating === C.MAX_BOOK_RATING && <PostitveIcon />)
                || (rating === C.MAX_BOOK_RATING / 2 && <NeutralIcon />)
                || <NegativeIcon />}
              </IconButton>
            )}
            >
              <>
                <Option handler={handleSetRating(C.MAX_BOOK_RATING)}>
                  <PostitveIcon />
                </Option>
                <Option handler={handleSetRating(C.MAX_BOOK_RATING / 2)}>
                  <NeutralIcon />
                </Option>
                <Option handler={handleSetRating(C.MIN_BOOK_RATING)}>
                  <NegativeIcon />
                </Option>
              </>
            </SelectBase>
          </div>
          <IconButton
            fontSize={50}
            color="#1C9CE3"
            onClick={handleSendArticle}
          >
            <SendIcon />
          </IconButton>
          {normalizedErrors[ArticleFields.article] !== undefined
          && (
          <Tooltip visible={!isEmpty(normalizedErrors[ArticleFields.article])}>
            {normalizedErrors[ArticleFields.article]}
          </Tooltip>
          )}
        </Wrapper>
      </Inner>
    </Outer>
  );
};

export default InputBlock;
